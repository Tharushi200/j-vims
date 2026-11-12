# 🚗 J-VIMS — Japan Vehicle Import & Sales Management System

A full-stack web application designed for **Bhagya Enterprises .JP** to manage Japanese vehicle imports, custom customer requests, cost quotation generation, multi-stage shipment tracking, and customer reviews.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite, Axios, Lucide Icons)
- **Backend**: Spring Boot 3 (Java 17, Spring Security, JWT, JPA / Hibernate)
- **Database**: MySQL

---

## 👥 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `bhagya@jvims.com` | `Bhagya123!` |
| **Customer** | `customer@jvims.com` | `Customer123!` |

---

## 🚀 How to Run

### 1. Database Setup
Import the database schema into MySQL:
```sql
CREATE DATABASE IF NOT EXISTS jvims_db;
USE jvims_db;
SOURCE database/schema.sql;
```

> **Note**: Update your database port/password in `backend/src/main/resources/application.properties` if needed (default configured for `localhost:3307`, root with no password).

### 2. Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
*(Runs on `http://localhost:8080`)*

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## ✨ Core Features

- **Vehicle Catalog**: Search and filter Japanese vehicles by make, model, year, and price.
- **Custom Import Requests**: Customers can submit custom vehicle requests from Japanese auctions.
- **Quotation Generator**: Calculate shipping, customs duty, and conversion rates (JPY to LKR).
- **Shipment & Registration Tracker**: Track order lifecycle from Japan purchase to local delivery.
- **Customer Reviews & Moderation**: Customer feedback system with admin moderation.
- **Offline Demo Mode**: Includes fallback mock data for testing and presentations.
