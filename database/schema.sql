-- ============================================================
-- Japan Vehicle Import & Sales Management System (J-VIMS)
-- Database DDL Schema for MySQL 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS jvims_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jvims_db;

-- Disable Foreign Key checks during initialization
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- Table: roles
-- ------------------------------------------------------------
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: users
-- ------------------------------------------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: user_roles
-- ------------------------------------------------------------
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_ur_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_ur_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: vehicle_categories
-- ------------------------------------------------------------
DROP TABLE IF EXISTS vehicle_categories;
CREATE TABLE vehicle_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: vehicles
-- ------------------------------------------------------------
DROP TABLE IF EXISTS vehicles;
CREATE TABLE vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    model_year INT NOT NULL,
    condition_type ENUM('BRAND_NEW', 'RECONDITIONED', 'USED') DEFAULT 'RECONDITIONED',
    mileage_km INT DEFAULT 0,
    fuel_type ENUM('PETROL', 'DIESEL', 'HYBRID', 'PLUG_IN_HYBRID', 'ELECTRIC', 'OTHER') DEFAULT 'PETROL',
    transmission ENUM('AUTOMATIC', 'MANUAL', 'CVT') DEFAULT 'AUTOMATIC',
    engine_capacity_cc INT DEFAULT 0,
    color VARCHAR(30),
    japan_price_jpy DECIMAL(15,2) DEFAULT 0.00,
    import_cost_lkr DECIMAL(15,2) DEFAULT 0.00,
    selling_price_lkr DECIMAL(15,2) NOT NULL,
    availability_status ENUM('AVAILABLE', 'RESERVED', 'IMPORTED', 'SOLD', 'UNAVAILABLE') DEFAULT 'AVAILABLE',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_v_category FOREIGN KEY (category_id) REFERENCES vehicle_categories(id),
    INDEX idx_veh_brand_model (brand, model),
    INDEX idx_veh_status (availability_status),
    INDEX idx_veh_price (selling_price_lkr)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: vehicle_images
-- ------------------------------------------------------------
DROP TABLE IF EXISTS vehicle_images;
CREATE TABLE vehicle_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vi_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: custom_requests
-- ------------------------------------------------------------
DROP TABLE IF EXISTS custom_requests;
CREATE TABLE custom_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    category_id INT NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    min_year INT,
    max_year INT,
    min_budget_lkr DECIMAL(15,2),
    max_budget_lkr DECIMAL(15,2),
    condition_type ENUM('BRAND_NEW', 'RECONDITIONED', 'USED', 'ANY') DEFAULT 'RECONDITIONED',
    fuel_type ENUM('PETROL', 'DIESEL', 'HYBRID', 'PLUG_IN_HYBRID', 'ELECTRIC', 'ANY') DEFAULT 'ANY',
    transmission ENUM('AUTOMATIC', 'MANUAL', 'CVT', 'ANY') DEFAULT 'ANY',
    preferred_color VARCHAR(50),
    additional_notes TEXT,
    status ENUM('NEW_REQUEST', 'UNDER_REVIEW', 'VEHICLE_FOUND', 'QUOTATION_CREATED', 'ACCEPTED', 'REJECTED', 'CANCELLED') DEFAULT 'NEW_REQUEST',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cr_customer FOREIGN KEY (customer_id) REFERENCES users(id),
    CONSTRAINT fk_cr_category FOREIGN KEY (category_id) REFERENCES vehicle_categories(id),
    INDEX idx_cr_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: quotations
-- ------------------------------------------------------------
DROP TABLE IF EXISTS quotations;
CREATE TABLE quotations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    request_id BIGINT NULL,
    vehicle_id BIGINT NULL,
    customer_id BIGINT NOT NULL,
    admin_id BIGINT NOT NULL,
    japan_price_jpy DECIMAL(15,2) DEFAULT 0.00,
    exchange_rate DECIMAL(10,4) DEFAULT 1.0000,
    japan_price_lkr DECIMAL(15,2) DEFAULT 0.00,
    shipping_cost_lkr DECIMAL(15,2) DEFAULT 0.00,
    customs_tax_lkr DECIMAL(15,2) DEFAULT 0.00,
    local_charges_lkr DECIMAL(15,2) DEFAULT 0.00,
    service_fee_lkr DECIMAL(15,2) DEFAULT 0.00,
    profit_margin_lkr DECIMAL(15,2) DEFAULT 0.00,
    total_estimated_price_lkr DECIMAL(15,2) NOT NULL,
    valid_until DATE NOT NULL,
    admin_notes TEXT,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_q_request FOREIGN KEY (request_id) REFERENCES custom_requests(id) ON DELETE SET NULL,
    CONSTRAINT fk_q_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    CONSTRAINT fk_q_customer FOREIGN KEY (customer_id) REFERENCES users(id),
    CONSTRAINT fk_q_admin FOREIGN KEY (admin_id) REFERENCES users(id),
    INDEX idx_q_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: orders
-- ------------------------------------------------------------
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    quotation_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    vehicle_id BIGINT NULL,
    total_amount_lkr DECIMAL(15,2) NOT NULL,
    paid_amount_lkr DECIMAL(15,2) DEFAULT 0.00,
    payment_status ENUM('UNPAID', 'PARTIALLY_PAID', 'FULLY_PAID') DEFAULT 'UNPAID',
    order_status ENUM(
        'CONFIRMED', 
        'PURCHASED_IN_JAPAN', 
        'SHIPPING', 
        'ARRIVED_IN_SRI_LANKA', 
        'REGISTRATION_PROCESSING', 
        'READY_FOR_DELIVERY', 
        'DELIVERED', 
        'COMPLETED', 
        'CANCELLED'
    ) DEFAULT 'CONFIRMED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_o_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(id),
    CONSTRAINT fk_o_customer FOREIGN KEY (customer_id) REFERENCES users(id),
    CONSTRAINT fk_o_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    INDEX idx_o_status (order_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: imports
-- ------------------------------------------------------------
DROP TABLE IF EXISTS imports;
CREATE TABLE imports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    vehicle_id BIGINT NULL,
    purchase_date DATE,
    japan_supplier_name VARCHAR(100),
    japan_purchase_price_jpy DECIMAL(15,2) DEFAULT 0.00,
    shipping_method VARCHAR(50) DEFAULT 'RoRo Vessel',
    shipment_reference_bl VARCHAR(100),
    vessel_name VARCHAR(100),
    departure_port VARCHAR(50) DEFAULT 'Yokohama, Japan',
    arrival_port VARCHAR(50) DEFAULT 'Hambantota, Sri Lanka',
    expected_arrival_date DATE,
    actual_arrival_date DATE,
    import_status ENUM('PENDING_PURCHASE', 'PURCHASED', 'IN_TRANSIT_SHIPPING', 'ARRIVED_PORT', 'CUSTOMS_CLEARED', 'COMPLETED') DEFAULT 'PENDING_PURCHASE',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_imp_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_imp_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: registration_tracking
-- ------------------------------------------------------------
DROP TABLE IF EXISTS registration_tracking;
CREATE TABLE registration_tracking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    vehicle_id BIGINT NULL,
    lawyer_name VARCHAR(100),
    lawyer_contact VARCHAR(50),
    submitted_date DATE,
    estimated_completion_date DATE,
    actual_completion_date DATE,
    registration_status ENUM('NOT_STARTED', 'DOCUMENTS_PREPARING', 'SUBMITTED_TO_LAWYER', 'LAWYER_PROCESSING', 'COMPLETED', 'DELAYED') DEFAULT 'NOT_STARTED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reg_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_reg_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: registration_documents
-- ------------------------------------------------------------
DROP TABLE IF EXISTS registration_documents;
CREATE TABLE registration_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    registration_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    document_type ENUM('IMPORT_CERTIFICATE', 'PURCHASE_INVOICE', 'BILL_OF_LADING', 'CUSTOMS_DECLARATION', 'INSURANCE_COPY', 'REGISTRATION_COPY', 'OTHER') NOT NULL,
    document_name VARCHAR(150) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    is_customer_visible BOOLEAN DEFAULT FALSE,
    uploaded_by_admin_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rd_reg FOREIGN KEY (registration_id) REFERENCES registration_tracking(id) ON DELETE CASCADE,
    CONSTRAINT fk_rd_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_rd_admin FOREIGN KEY (uploaded_by_admin_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: deliveries
-- ------------------------------------------------------------
DROP TABLE IF EXISTS deliveries;
CREATE TABLE deliveries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    vehicle_id BIGINT NULL,
    delivery_address TEXT NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    scheduled_delivery_date DATE,
    actual_delivery_date DATE,
    delivery_status ENUM('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'FAILED') DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_del_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_del_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: reviews
-- ------------------------------------------------------------
DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    order_id BIGINT NULL,
    vehicle_id BIGINT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    is_verified_buyer BOOLEAN DEFAULT FALSE,
    status ENUM('APPROVED', 'HIDDEN') DEFAULT 'APPROVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_rev_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_rev_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
    CONSTRAINT fk_rev_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    INDEX idx_rev_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: payments
-- ------------------------------------------------------------
DROP TABLE IF EXISTS payments;
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    amount_lkr DECIMAL(15,2) NOT NULL,
    payment_method ENUM('BANK_TRANSFER', 'CASH', 'CHEQUE', 'ONLINE_CARD') DEFAULT 'BANK_TRANSFER',
    reference_no VARCHAR(100),
    status ENUM('PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    CONSTRAINT fk_pay_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: notifications
-- ------------------------------------------------------------
DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'GENERAL',
    is_read BOOLEAN DEFAULT FALSE,
    reference_id BIGINT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notif_user_read (user_id, is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: system_settings
-- ------------------------------------------------------------
DROP TABLE IF EXISTS system_settings;
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: activity_logs
-- ------------------------------------------------------------
DROP TABLE IF EXISTS activity_logs;
CREATE TABLE activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id BIGINT,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Enable Foreign Key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Roles
INSERT INTO roles (id, name, description) VALUES
(1, 'ROLE_CUSTOMER', 'Standard Customer who browses vehicles, submits import requests, and tracks orders'),
(2, 'ROLE_ADMIN', 'Operations Admin managing inventory, quotations, imports, and deliveries');

-- Default Vehicle Categories
INSERT INTO vehicle_categories (id, name, code, description, is_active) VALUES
(1, 'Bicycle', 'BICYCLE', 'Japanese Bicycles, E-Bikes, and Sports Bicycles', TRUE),
(2, 'Motorcycle', 'MOTORCYCLE', 'Japanese Motorcycles, Scooters, and Sports Bikes', TRUE),
(3, 'Car', 'CAR', 'Japanese Sedans, Hatchbacks, and Compact Cars', TRUE),
(4, 'Van / Bus', 'VAN', 'Japanese Commercial Vans, Passenger Vans, and Minibuses', TRUE),
(5, 'SUV / 4x4', 'SUV', 'Japanese SUVs, Crossovers, and 4x4 Vehicles', TRUE);

-- System Settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('JPY_TO_LKR_RATE', '2.15', 'Default Japan Yen to Sri Lankan Rupee conversion rate'),
('FEATURE_BICYCLE_IMPORT', 'ON', 'Bicycle import module status'),
('FEATURE_MOTORCYCLE_IMPORT', 'ON', 'Motorcycle import module status'),
('FEATURE_CAR_IMPORT', 'ON', 'Car import module status'),
('FEATURE_VAN_IMPORT', 'ON', 'Van import module status'),
('FEATURE_SUV_IMPORT', 'ON', 'SUV import module status'),
('FEATURE_ONLINE_PAYMENT', 'OFF', 'Online payment gateway status');
