package com.jvims.service.impl;

import com.jvims.dto.*;
import com.jvims.entity.ERole;
import com.jvims.entity.Role;
import com.jvims.entity.User;
import com.jvims.repository.RoleRepository;
import com.jvims.repository.UserRepository;
import com.jvims.security.jwt.JwtUtils;
import com.jvims.security.services.UserDetailsImpl;
import com.jvims.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public MessageResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new MessageResponse("Error: Email is already in use!", false);
        }

        // Create new user entity
        User user = new User(
                registerRequest.getFullName(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()),
                registerRequest.getPhone()
        );

        String reqRole = registerRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (reqRole == null || reqRole.isBlank()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                    .orElseThrow(() -> new RuntimeException("Error: Default ROLE_CUSTOMER is not found."));
            roles.add(userRole);
        } else {
            switch (reqRole.toUpperCase()) {
                case "ADMIN":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: ROLE_ADMIN is not found."));
                    roles.add(adminRole);
                    break;
                default:
                    Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                            .orElseThrow(() -> new RuntimeException("Error: ROLE_CUSTOMER is not found."));
                    roles.add(userRole);
            }
        }

        user.setRoles(roles);
        userRepository.save(user);

        return new MessageResponse("User registered successfully!");
    }

    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getFullName(),
                userDetails.getEmail(),
                userDetails.getPhone(),
                roles
        );
    }

    @Override
    public UserDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getStatus().name(),
                roles,
                user.getCreatedAt()
        );
    }

    @Override
    public UserDto updateProfile(String email, String fullName, String phone) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        if (fullName != null && !fullName.isBlank()) {
            user.setFullName(fullName);
        }
        if (phone != null && !phone.isBlank()) {
            user.setPhone(phone);
        }
        User saved = userRepository.save(user);

        List<String> roles = saved.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        return new UserDto(
                saved.getId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getPhone(),
                saved.getStatus().name(),
                roles,
                saved.getCreatedAt()
        );
    }

    @Override
    public void changePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        if (!encoder.matches(currentPassword, user.getPasswordHash())) {
            throw new RuntimeException("Current password does not match");
        }
        user.setPasswordHash(encoder.encode(newPassword));
        userRepository.save(user);
    }
}
