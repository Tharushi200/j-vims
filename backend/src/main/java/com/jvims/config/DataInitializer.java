package com.jvims.config;

import com.jvims.dto.VehicleCreateRequest;
import com.jvims.entity.ERole;
import com.jvims.entity.Role;
import com.jvims.entity.User;
import com.jvims.entity.VehicleCategory;
import com.jvims.repository.RoleRepository;
import com.jvims.repository.UserRepository;
import com.jvims.repository.VehicleCategoryRepository;
import com.jvims.repository.VehicleRepository;
import com.jvims.service.VehicleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleCategoryRepository categoryRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Initializing system roles, default categories, and seed user accounts...");

        // 1. Initialize Roles
        Role customerRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_CUSTOMER, "Standard Customer Role")));

        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_ADMIN, "Operations Admin Role")));

        // 2. Initialize Seed Users
        // Admin: Bhagya Gimhan
        User existingAdmin = userRepository.findByEmail("admin@jvims.com").orElse(null);
        if (existingAdmin != null) {
            existingAdmin.setFullName("Bhagya Gimhan");
            existingAdmin.setEmail("bhagya@jvims.com");
            existingAdmin.setPasswordHash(passwordEncoder.encode("Bhagya123!"));
            existingAdmin.setRoles(Set.of(adminRole));
            userRepository.save(existingAdmin);
            logger.info("Updated existing Admin Account to: bhagya@jvims.com / Bhagya123! (Bhagya Gimhan)");
        } else if (!userRepository.existsByEmail("bhagya@jvims.com")) {
            User admin = new User("Bhagya Gimhan", "bhagya@jvims.com", passwordEncoder.encode("Bhagya123!"), "+94777654321");
            admin.setRoles(Set.of(adminRole));
            userRepository.save(admin);
            logger.info("Created Seed Admin: bhagya@jvims.com / Bhagya123! (Bhagya Gimhan)");
        }

        if (!userRepository.existsByEmail("customer@jvims.com")) {
            User customer = new User("Customer Account", "customer@jvims.com", passwordEncoder.encode("Customer123!"), "+94719876543");
            customer.setRoles(Set.of(customerRole));
            userRepository.save(customer);
            logger.info("Created Seed Customer: customer@jvims.com / Customer123!");
        }

        // 3. Initialize Default Vehicle Categories (Motorcycle first for priority)
        VehicleCategory catBike = createCategoryIfAbsent("Motorcycle", "MOTORCYCLE", "Japanese Motorcycles, Scooters, and Sports Bikes");
        VehicleCategory catBicycle = createCategoryIfAbsent("Bicycle", "BICYCLE", "Japanese Bicycles, E-Bikes, and Sports Bicycles");
        VehicleCategory catCar = createCategoryIfAbsent("Car", "CAR", "Japanese Sedans, Hatchbacks, and Compact Cars");
        VehicleCategory catVan = createCategoryIfAbsent("Van / Bus", "VAN", "Japanese Commercial Vans, Passenger Vans, and Minibuses");
        VehicleCategory catSuv = createCategoryIfAbsent("SUV / 4x4", "SUV", "Japanese SUVs, Crossovers, and 4x4 Vehicles");

        // 4. Initialize Priority Motorbicycles Catalog
        logger.info("Seeding / Verifying Motorbicycle & Vehicle Catalog...");

        // Priority Motorbicycles (BMW C400GT, Kawasaki ZX-25RR, Honda ADV 160, Honda PCX 125cc)
        if (!vehicleExists("BMW", "C400GT ABS")) {
            createSeedVehicle(catBike.getId(), "BMW", "C400GT ABS", 2024, "BRAND_NEW", 0, "PETROL", "AUTOMATIC", 350, "Alpine White",
                    new BigDecimal("1150000"), new BigDecimal("1850000"), new BigDecimal("4600000"), "AVAILABLE",
                    "Premium BMW C400GT maxi-scooter with TFT connectivity display, Keyless Ride, Automatic Stability Control (ASC), and spacious underseat storage. Direct Japanese import.",
                    List.of("https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80"));
        }

        if (!vehicleExists("Kawasaki", "Ninja ZX-25RR KRT Edition")) {
            createSeedVehicle(catBike.getId(), "Kawasaki", "Ninja ZX-25RR KRT Edition", 2024, "BRAND_NEW", 0, "PETROL", "MANUAL", 249, "Lime Green / Ebony",
                    new BigDecimal("1080000"), new BigDecimal("1700000"), new BigDecimal("4250000"), "AVAILABLE",
                    "High-revving 249cc in-line 4 cylinder supersport bike with SHOWA BFRC lite rear suspension, Kawasaki Quick Shifter (KQS), and KTRC traction control.",
                    List.of("https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80"));
        }

        if (!vehicleExists("Honda", "ADV 160 ABS")) {
            createSeedVehicle(catBike.getId(), "Honda", "ADV 160 ABS", 2024, "BRAND_NEW", 0, "PETROL", "AUTOMATIC", 157, "Mat Charcoal Gray",
                    new BigDecimal("490000"), new BigDecimal("820000"), new BigDecimal("1980000"), "AVAILABLE",
                    "Rugged urban adventure scooter featuring 157cc 4-valve eSP+ engine, Honda Selectable Torque Control (HSTC), adjustable windscreen, and Honda Smart Key.",
                    List.of("https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80"));
        }

        if (!vehicleExists("Honda", "PCX 125cc ABS")) {
            createSeedVehicle(catBike.getId(), "Honda", "PCX 125cc ABS", 2024, "BRAND_NEW", 0, "PETROL", "AUTOMATIC", 124, "Pearl Jasmine White",
                    new BigDecimal("380000"), new BigDecimal("650000"), new BigDecimal("1650000"), "AVAILABLE",
                    "Ultra-efficient Japanese spec Honda PCX 125cc with eSP+ engine, full LED lighting, USB Type-C charging port, and large 30L under-seat storage.",
                    List.of("https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80"));
        }

        // Initialize general catalog if empty
        if (vehicleRepository.count() <= 4) {
            // Motorcycle: Yamaha MT-07
            if (!vehicleExists("Yamaha", "MT-07 ABS Japan Spec")) {
                createSeedVehicle(catBike.getId(), "Yamaha", "MT-07 ABS Japan Spec", 2023, "BRAND_NEW", 0, "PETROL", "MANUAL", 689, "Cyan Storm",
                        new BigDecimal("780000"), new BigDecimal("1200000"), new BigDecimal("4200000"), "AVAILABLE",
                        "Brand new 2023 Yamaha MT-07. 689cc CP2 engine, TFT digital dashboard, aggressive streetfighter styling, dual front disc brakes.",
                        List.of("https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80"));
            }

            // Car 1: Toyota Prius Hybrid
            if (!vehicleExists("Toyota", "Prius Hybrid S-Grade")) {
                createSeedVehicle(catCar.getId(), "Toyota", "Prius Hybrid S-Grade", 2021, "RECONDITIONED", 35000, "HYBRID", "AUTOMATIC", 1800, "Pearl White",
                        new BigDecimal("1850000"), new BigDecimal("3200000"), new BigDecimal("10800000"), "AVAILABLE",
                        "Mint condition 2021 Toyota Prius S-Safety Plus. Direct from Kobe auction. Features Toyota Safety Sense 2.0, dual-zone climate, and reverse camera.",
                        List.of("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"));
            }

            // Car 2: Honda Vezel e:HEV
            if (!vehicleExists("Honda", "Vezel e:HEV Z-Package")) {
                createSeedVehicle(catSuv.getId(), "Honda", "Vezel e:HEV Z-Package", 2022, "RECONDITIONED", 22000, "HYBRID", "AUTOMATIC", 1500, "Crystal Black",
                        new BigDecimal("2400000"), new BigDecimal("3800000"), new BigDecimal("14500000"), "AVAILABLE",
                        "Stunning 2022 Honda Vezel Z-Package e:HEV. Premium leather interior, panoramic glass roof, 360-degree camera system, and Honda Sensing suite.",
                        List.of("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80"));
            }

            // Van 1: Toyota HiAce Super GL
            if (!vehicleExists("Toyota", "HiAce Super GL Dark Prime II")) {
                createSeedVehicle(catVan.getId(), "Toyota", "HiAce Super GL Dark Prime II", 2020, "RECONDITIONED", 48000, "DIESEL", "AUTOMATIC", 2800, "Metallic Silver",
                        new BigDecimal("2900000"), new BigDecimal("4100000"), new BigDecimal("16800000"), "AVAILABLE",
                        "2020 Toyota HiAce Dark Prime II Turbo Diesel 1GD. Dual sliding doors, upgraded LED headlights, half-leather seating, push start button.",
                        List.of("https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80"));
            }

            // Bicycle 1: Bridgestone E-Bike
            if (!vehicleExists("Bridgestone", "TB1e Dual Drive Electric Bike")) {
                createSeedVehicle(catBicycle.getId(), "Bridgestone", "TB1e Dual Drive Electric Bike", 2024, "BRAND_NEW", 0, "ELECTRIC", "AUTOMATIC", 0, "Matte Black",
                        new BigDecimal("140000"), new BigDecimal("180000"), new BigDecimal("550000"), "AVAILABLE",
                        "Japanese precision Bridgestone TB1e Electric Bicycle. Dual drive front motor with kinetic energy recovery braking. Range up to 130km per charge.",
                        List.of("https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80"));
            }
        }

        logger.info("Vehicle catalog seeded successfully!");
        logger.info("System Initialization Complete!");
    }

    private VehicleCategory createCategoryIfAbsent(String name, String code, String description) {
        return categoryRepository.findByCode(code).orElseGet(() ->
                categoryRepository.save(new VehicleCategory(name, code, description))
        );
    }

    private void createSeedVehicle(Integer categoryId, String brand, String model, int year, String condition, int mileage, String fuel, String trans, int cc, String color,
                                  BigDecimal japanJpy, BigDecimal importLkr, BigDecimal sellingLkr, String status, String desc, List<String> images) {
        VehicleCreateRequest req = new VehicleCreateRequest();
        req.setCategoryId(categoryId);
        req.setBrand(brand);
        req.setModel(model);
        req.setModelYear(year);
        req.setConditionType(condition);
        req.setMileageKm(mileage);
        req.setFuelType(fuel);
        req.setTransmission(trans);
        req.setEngineCapacityCc(cc);
        req.setColor(color);
        req.setJapanPriceJpy(japanJpy);
        req.setImportCostLkr(importLkr);
        req.setSellingPriceLkr(sellingLkr);
        req.setAvailabilityStatus(status);
        req.setDescription(desc);
        req.setImageUrls(images);
        vehicleService.createVehicle(req);
    }

    private boolean vehicleExists(String brand, String model) {
        return vehicleRepository.findAll().stream()
                .anyMatch(v -> v.getBrand().equalsIgnoreCase(brand) && v.getModel().equalsIgnoreCase(model));
    }
}
