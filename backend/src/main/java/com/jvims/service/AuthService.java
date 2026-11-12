package com.jvims.service;

import com.jvims.dto.JwtResponse;
import com.jvims.dto.LoginRequest;
import com.jvims.dto.MessageResponse;
import com.jvims.dto.RegisterRequest;
import com.jvims.dto.UserDto;

public interface AuthService {
    MessageResponse registerUser(RegisterRequest registerRequest);
    JwtResponse authenticateUser(LoginRequest loginRequest);
    UserDto getCurrentUser(String email);
    UserDto updateProfile(String email, String fullName, String phone);
    void changePassword(String email, String currentPassword, String newPassword);
}
