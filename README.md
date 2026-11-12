# 🚗 J-VIMS — Japan Vehicle Import & Sales Management System

**J-VIMS** is an enterprise-grade full-stack web application designed and developed for **Bhagya Enterprises .JP**, a Japanese vehicle and motorcycle import company based in Japan and Sri Lanka. 

The system automates the complete lifecycle of direct Japanese vehicle imports—from Japanese auction browsing and custom vehicle requests to transparent quotation generation, international sea freight tracking, customs clearance, legal registration, and final customer delivery.

---

## 📌 Project Overview & Background

Importing vehicles directly from Japan to Sri Lanka involves multiple complex stages:
- Navigating Japanese auto auctions (e.g., USS, TAA, ARAI).
- Handling volatile foreign currency exchange rates (JPY to LKR).
- Calculating dynamic import duties, customs taxes, freight fees, and port clearing charges.
- Keeping buyers informed across long overseas shipping timelines and local registration processes.

**J-VIMS** addresses these challenges by replacing manual paperwork and fragmented messaging with a centralized, transparent digital platform connecting customers, importers, and operational managers.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, Vite, React Router DOM, Axios, Lucide Icons, Cyber-Luxury Glassmorphic CSS Theme
- **Backend**: Java 17, Spring Boot 3, Spring Security, JWT (JSON Web Tokens), Spring Data JPA, Hibernate
- **Database**: MySQL Relational Database (Normalized Schema)
- **Architecture**: Modular 3-Tier Layered Architecture (Controller ➔ Service ➔ Repository ➔ Database) with stateless RESTful APIs.

---

## 🌟 Key Functional Modules & Workflow

```
[Customer Request] ➔ [Auction Review] ➔ [Automated Quotation] ➔ [Customer Acceptance] ➔ [Order Confirmed]
        ➔ [Japan Purchase] ➔ [Vessel Shipping] ➔ [Customs Clearing] ➔ [Registration] ➔ [Delivery]
```

### 1. Vehicle Catalog & Showcase
- Interactive vehicle inventory with advanced filters (Brand, Model, Year, Fuel Type, Transmission, Budget).
- High-resolution vehicle galleries, detailed technical specifications, and condition tags (Brand New / Reconditioned).
- Customer inquiry portal for direct questions regarding specific stock.

### 2. Custom Import Request Engine
- When customers cannot find a desired motorcycle or vehicle in local stock, they submit a custom import requirement (e.g., *Honda ADV 160 ABS*, *Toyota Prius Hybrid*).
- Allows specifying target budget in LKR, acceptable model year range, preferred colors, and fuel types.

### 3. Transparent Quotation & Price Calculation Engine
- Integrated cost calculation formula tailored to Sri Lankan vehicle import regulations:
  $$\text{Total Price} = (\text{Japan JPY Price} \times \text{Exchange Rate}) + \text{Freight} + \text{Customs Tax} + \text{Port Charges} + \text{Service Fee}$$
- Administrators generate formal digital quotations with validity periods and detailed cost breakdowns.
- Customers can accept or reject quotes directly from their portal.

### 4. End-to-End Shipment & Lifecycle Tracking
- Multi-stage tracking pipeline providing live visibility of vehicle status:
  1. **Order Confirmed**
  2. **Purchased in Japan** (Auction purchase & yard inspection)
  3. **Vessel Shipping** (Yokohama/Kobe port departure, vessel name, voyage number)
  4. **Arrived in Sri Lanka** (Hambantota/Colombo port arrival & customs clearance)
  5. **Registration Processing** (Government vehicle registration & documentation)
  6. **Ready for Delivery & Delivered**

### 5. Customer Reviews & Community Feedback
- Verified buyers can submit star ratings and detailed reviews about their vehicle and import experience.
- Admin moderation panel allows review approval, visibility toggling, or removal.

### 6. Payment Transaction Tracking
- Built-in tracking of multi-part payments (advance deposit, customs payment, final settlement).
- Records payment method (bank transfer, cash), receipt references, and administrative verification status.

---

## 💼 Business Impact

- **Transparency**: Eliminates hidden costs and gives buyers real-time visibility into their vehicle's journey from Japan to Sri Lanka.
- **Operational Efficiency**: Reduces manual quotation calculation time and streamlines legal documentation tracking.
- **Data Integrity**: Enforces secure role-based access control (RBAC) ensuring customer data privacy and business accountability.
