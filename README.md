# 🇯🇵 Bhagya Enterprises .JP — Japan Vehicle Import & Sales Management System (J-VIMS)

A complete full-stack enterprise web application built for **Bhagya Enterprises .JP** to streamline Japanese vehicle auctions, direct import shipments, custom customer requests, cost quotation generation, multi-stage shipment & legal registration tracking, and customer review management.

Developed as a **Final Year Project for Higher Diploma in Computing / Software Engineering**.

---

## 🏗️ System Architecture & Stack

- **Frontend**: React 19 (Vite, React Router DOM v7, Lucide Icons, Axios, Modern Dark Glassmorphic Design System)
- **Backend**: Java 17 / Spring Boot 3.2.5 (Spring Security, Spring Data JPA, JWT Authentication, Hibernate, Maven)
- **Database**: MySQL 8.0+ (`jvims_db`)
- **Documentation**: SRS Specifications, ER Diagrams, Database DDL Scripts in `/docs` and `/database`

---

## 📁 Repository Directory Layout

```text
j-vims/
├── backend/                  # Spring Boot Java REST API backend
│   ├── src/main/java/com/jvims/
│   │   ├── JvimsApplication.java
│   │   ├── config/           # Security, CORS & Web configurations
│   │   ├── controller/       # REST API endpoints (Auth, Vehicles, Requests, Quotes, Orders, Reviews, Payments)
│   │   ├── dto/              # Request / Response DTO models
│   │   ├── entity/           # JPA Database Entities
│   │   ├── exception/        # Global exception handling
│   │   ├── repository/       # Spring Data JPA Repositories
│   │   ├── security/         # JWT filter, tokens, UserDetails
│   │   └── service/          # Business logic interfaces & implementations
│   ├── pom.xml
│   └── src/main/resources/application.properties
│
├── frontend/                 # React SPA Client
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Footer, Modals, Cards)
│   │   ├── context/          # Auth Context & JWT Session management
│   │   ├── pages/            # Public, Customer Portal, Admin Dashboard views
│   │   ├── services/         # Axios API clients with offline mock fallback
│   │   └── styles/           # Cyber-luxury glassmorphism CSS design system
│   ├── package.json
│   └── vite.config.js
│
├── database/                 # MySQL Database Schema DDL & Seed Data
│   └── schema.sql
│
├── docs/                     # SRS & Project Specifications
│   └── SRS.md
│
├── run-backend.bat           # One-click startup script for Backend (Windows)
├── run-frontend.bat          # One-click startup script for Frontend (Windows)
└── README.md
```

---

## 👥 User Roles & Demo Credentials

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Admin** (Owner - Bhagya Gimhan) | `bhagya@jvims.com` | `Bhagya123!` | Full Admin Dashboard: Inventory management, Reviewing import requests, Quotation pricing calculator, Shipment & legal registration tracking, Customer reviews moderation, Payments verification |
| **Customer** | `customer@jvims.com` | `Customer123!` | Vehicle catalog, Submit custom import requests, Quotations review & accept, Live order shipment tracker, Post reviews & ratings, Payment history, User profile |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Java JDK 17** or higher
- **Node.js** (v18+ or v20+) and **npm**
- **MySQL Server** (port `3306` or `3307`)
- **Maven** (or use bundled Maven in IntelliJ IDEA / Eclipse)

### 2. Database Setup
1. Open MySQL Command Line or MySQL Workbench:
```sql
CREATE DATABASE IF NOT EXISTS jvims_db;
USE jvims_db;
SOURCE database/schema.sql;
```

2. Verify or edit your DB credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3307/jvims_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=
```

### 3. Backend Run (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
*(Or on Windows, simply double-click `run-backend.bat`)*

Backend will start on: **`http://localhost:8080`**

### 4. Frontend Run (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*(Or on Windows, simply double-click `run-frontend.bat`)*

Frontend will start on: **`http://localhost:5173`**

---

## 🌟 Key Features

1. **Vehicle Catalog**: Search and filter by brand, model, condition (Brand New / Reconditioned), fuel type, and price.
2. **Custom Import Request Engine**: Customers can request any Japanese motorbike or car (e.g. Honda ADV 160 ABS).
3. **Quotation & Cost Calculator**: Dynamic currency conversion (JPY to LKR), shipping & freight, Sri Lanka customs duties, local port charges, and profit margin calculation.
4. **End-to-End Shipment Tracker**: Order tracking across all stages: `Purchased in Japan` ➔ `Yokohama/Kobe Port` ➔ `Vessel Shipping` ➔ `Hambantota/Colombo Port` ➔ `Lawyer Registration` ➔ `Ready for Delivery`.
5. **Customer Reviews & Ratings**: Verified customer reviews with admin moderation.
6. **Internal Payment Tracking**: Track bank transfers, cash payments, and payment status verification.
7. **Offline Mock Fallback**: Seamless presentation mode even if MySQL or the backend is offline during viva/demo.

---

## 📞 Contact & Business Info

- **Business**: Bhagya Enterprises .JP
- **Owner**: Bhagya Gimhan
- **Phone (Sri Lanka)**: `+94 76 009 6432`
- **Phone (Japan)**: `+81 70-8558-6499`
- **Facebook**: Bhagya Gimhan
