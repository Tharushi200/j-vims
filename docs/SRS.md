# Software Requirements Specification (SRS)
## Japan Vehicle Import & Sales Management System (J-VIMS)

---

## 1. Introduction

### 1.1 Purpose
This document provides a detailed specification for the **Japan Vehicle Import & Sales Management System (J-VIMS)**. J-VIMS is an end-to-end web application designed to digitize and streamline the process of importing and selling Japanese vehicles (bicycles, motorcycles, cars, vans, SUVs, etc.).

### 1.2 System Scope
J-VIMS connects three main user roles:
1. **Customer**: Browses available vehicles, submits custom vehicle import requests, reviews cost quotations, places orders, tracks shipment/import stages, tracks lawyer registration assistance, and views delivery progress.
2. **Admin (Operations)**: Manages vehicle inventory, reviews custom import requests, generates structured cost quotations (Japan price + shipping + taxes + charges), updates import status and tracking stages, assigns registration lawyer processing details, manages document uploads, and handles deliveries.
3. **Super Admin (System Owner)**: Manages users and role assignments, configures vehicle category features (toggle bicycle/motorcycle/car import options), modifies system settings, and inspects audit/activity logs.

---

## 2. Overall Description

### 2.1 User Classes and Characteristics
| Role | Description | Core Capabilities |
| :--- | :--- | :--- |
| **CUSTOMER** | External end-user looking to buy or import vehicles. | Registration, Login, Catalog Search/Filter, Custom Request, Quotation Accept/Reject, Order Tracking, Profile. |
| **ADMIN** | Business manager (Operations). | Dashboard, Inventory CRUD, Request Processing, Quotation Builder, Import Status Tracking, Registration Tracking, Document Upload, Delivery Tracking, Sales Reports. |
| **SUPER_ADMIN** | System owner / Lead developer. | User & Role Management, Vehicle Category Toggle, System Settings, Audit Logs, Global Override. |

### 2.2 Business Workflow Diagram
```text
Customer                        Admin                          System / Database
   │                              │                                    │
   ├─► Browse Catalog ────────────┼───────────────────────────────────►│
   │                              │                                    │
   ├─► Submit Custom Request ─────┼───────────────────────────────────►│ (Status: NEW)
   │                              │                                    │
   │                              ├─► Review Request & Search Japan ──►│ (Status: UNDER_REVIEW)
   │                              ├─► Calculate & Issue Quote ────────►│ (Status: QUOTATION_CREATED)
   │                              │                                    │
   ├─► Review Quote ──────────────┼───────────────────────────────────►│
   ├─► Accept Quotation ──────────┼───────────────────────────────────►│ (Status: QUOTATION_ACCEPTED)
   │                              │                                    │
   │                              │ (Order Auto-Generated) ───────────►│ (Order: CONFIRMED)
   │                              │                                    │
   │                              ├─► Update Purchase in Japan ───────►│ (Import: PURCHASED_IN_JAPAN)
   │                              ├─► Update Shipment Details ────────►│ (Import: IN_TRANSIT_SHIPPING)
   │                              ├─► Update Arrival in SL ───────────►│ (Import: ARRIVED_SRI_LANKA)
   │                              ├─► Assign Lawyer / Reg Details ────►│ (Reg: LAWYER_PROCESSING)
   │                              ├─► Mark Ready for Delivery ────────►│ (Delivery: READY_FOR_DELIVERY)
   │                              ├─► Complete Delivery ─────────────►│ (Order: COMPLETED)
```

---

## 3. Functional Requirements

### 3.1 Authentication & Authorization Module
- **FR-AUTH-01**: Users shall register with full name, email, phone number, and password.
- **FR-AUTH-02**: Passwords must be hashed using BCrypt before storing.
- **FR-AUTH-03**: System shall authenticate users via Email & Password, issuing a signed JWT token valid for 24 hours.
- **FR-AUTH-04**: Role-Based Access Control (RBAC) must be enforced at both Spring Security API endpoint level and frontend router level.

### 3.2 Vehicle Management Module
- **FR-VEH-01**: Admin shall create, read, update, and soft-delete vehicle listings.
- **FR-VEH-02**: Vehicles shall belong to extensible categories (Bicycle, Motorcycle, Car, Van, SUV).
- **FR-VEH-03**: Vehicle attributes include Brand, Model, Year, Condition, Mileage, Fuel Type, Transmission, Engine Capacity, Color, Japan Base Price, Import Cost, Selling Price, Availability Status (`AVAILABLE`, `RESERVED`, `IMPORTED`, `SOLD`, `UNAVAILABLE`), and multiple Image URLs.
- **FR-VEH-04**: Customers shall search, filter (by category, price range, brand, fuel type, transmission, year), and sort vehicle listings.

### 3.3 Custom Import Request Module
- **FR-REQ-01**: Registered Customers can submit custom import requests detailing vehicle type, target brand/model, min/max year, budget range, preferred color, fuel/transmission preference, and specific requirements.
- **FR-REQ-02**: Request status workflow: `NEW_REQUEST` → `UNDER_REVIEW` → `VEHICLE_FOUND` → `QUOTATION_CREATED` → `ACCEPTED` / `REJECTED` / `CANCELLED`.
- **FR-REQ-03**: Admins can add internal investigation notes to custom requests.

### 3.4 Quotation Engine Module
- **FR-QUOTE-01**: Admin shall generate structured cost quotations for approved custom requests or selected vehicles.
- **FR-QUOTE-02**: Quotations calculate total estimated price breakdown:
  $$\text{Total Price} = \text{Japan Base Price} + \text{Shipping Cost} + \text{Customs/Import Tax} + \text{Local Charges} + \text{Service Fee} + \text{Profit Margin}$$
- **FR-QUOTE-03**: Quotations include validity period (expiration date) and terms.
- **FR-QUOTE-04**: Customer receives quote notification and can Accept or Reject quote within validity period.

### 3.5 Order & Import Tracking Module
- **FR-ORD-01**: System automatically creates an Order when Customer accepts a Quotation.
- **FR-ORD-02**: Order tracking stages: `CONFIRMED` → `PURCHASED_IN_JAPAN` → `SHIPPING` → `ARRIVED_IN_SRI_LANKA` → `REGISTRATION_PROCESSING` → `READY_FOR_DELIVERY` → `DELIVERED` → `COMPLETED`.
- **FR-IMP-01**: Admin updates import details including Purchase Date, Japan Supplier Name, Shipping Vessel/Carrier, Tracking/BL Reference, Port of Origin (e.g. Yokohama/Kobe), Port of Arrival (Hambantota/Colombo), Expected Arrival Date, Actual Arrival Date, and Customs Clearance Notes.
- **FR-IMP-02**: Customer views a visual progress timeline based on import stage updates.

### 3.6 Registration Assistance Module
- **FR-REG-01**: Tracks non-legal registration processing timeline: `REGISTRATION_REQUIRED` → `DOCUMENTS_PREPARING` → `SUBMITTED_TO_LAWYER` → `LAWYER_PROCESSING` → `COMPLETED`.
- **FR-REG-02**: Admin manages Assigned Lawyer/Agent Name, Contact, Submission Date, Estimated Completion Date, and Document links.

### 3.7 Document Management Module
- **FR-DOC-01**: Admin can upload and attach documents (Export Certificate, Bill of Lading, Customs Clearance Invoice, Ownership Document, Registration Copy) to an Order/Vehicle.
- **FR-DOC-02**: Customer can view/download non-sensitive documents associated with their order.

### 3.8 Delivery Management Module
- **FR-DEL-01**: Delivery workflow: `PENDING` → `ASSIGNED` → `IN_TRANSIT` → `DELIVERED`.
- **FR-DEL-02**: Admin records delivery address, receiver contact, delivery driver/agent name, estimated delivery time, and confirmation notes.

### 3.9 Super Admin & System Administration
- **FR-SA-01**: Manage user accounts and change user roles (`CUSTOMER`, `ADMIN`, `SUPER_ADMIN`).
- **FR-SA-02**: Enable or disable specific vehicle categories (e.g. Toggle `Car Import` ON/OFF).
- **FR-SA-03**: Configure system parameters (Currency exchange rates, contact details, default margin rules).
- **FR-SA-04**: View system activity/audit logs (timestamp, user, action, IP address).

---

## 4. Non-Functional Requirements

### 4.1 Security
- Password storage encrypted using BCrypt hash (strength 10+).
- All APIs protected via stateless JWT authentication filter.
- Role-Based Endpoint Protection (`/api/admin/**` requires `ROLE_ADMIN` or `ROLE_SUPER_ADMIN`; `/api/super-admin/**` requires `ROLE_SUPER_ADMIN`).
- Protection against SQL Injection (via JPA parameterized queries), XSS, and CSRF.

### 4.2 Performance & Scalability
- REST API response times < 200ms for standard queries.
- Database index optimization on frequently searched columns (`category_id`, `status`, `brand`, `customer_id`, `created_at`).
- Cloud image hosting (Cloudinary) with cached CDN delivery.

### 4.3 Reliability & Auditability
- Activity log tracking for critical operations (User registration, quotation creation, order status updates).
- Soft deletion support for key data entities.
