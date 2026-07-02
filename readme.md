# Sharma Furniture Works

A full-stack MERN eCommerce platform for modern furniture businesses, providing a seamless shopping experience for customers and a powerful administration panel for business management.

<p align="center">
  <img src="./frontend/src/assets/logo.png" alt="Sharma Furniture Works" width="180"/>
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-success?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)

</p>

---

## Overview

Sharma Furniture Works is a production-ready furniture eCommerce platform developed using the MERN stack. It enables customers to browse premium furniture collections, search products, manage shopping carts, place secure orders, and review purchased products.

The platform also provides administrators with a complete management dashboard for handling inventory, customers, products, and orders.

The project follows a scalable architecture with separate frontend and backend applications.

---

## Live Demo

| Application | URL |
|-------------|-----|
| Frontend | https://www.sharmafurnitureworks.com/|
| Backend API | Render Deployment |

---

# Features

## Customer

- User Registration & Login
- JWT Authentication
- Secure Password Encryption
- Product Search
- Product Filtering
- Product Categories
- Shopping Cart
- Product Reviews
- Order Placement
- Order History
- Password Reset via Email
- Responsive Design

---

## Administrator

- Dashboard
- Product Management
- User Management
- Order Management
- Inventory Control
- Product Image Upload
- Product Specification Upload
- Order Status Updates
- Role-Based Access Control

---

# Technology Stack

## Frontend

- React 19
- Vite
- Redux Toolkit
- Redux Thunk
- React Router DOM
- Axios
- Material UI
- Tailwind CSS
- Framer Motion
- React Toastify

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary
- Nodemailer
- Validator.js

---

# Project Architecture

```
Client (React)

        │

        ▼

Express REST API

        │

        ▼

Authentication Middleware

        │

        ▼

Controllers

        │

        ▼

MongoDB Database
```

---

# Project Structure

```
sharma-furniture-works/

│

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── App.jsx
│   │
│   ├── vite.config.js
│   └── vercel.json
│
├── package.json
└── README.md
```

---

# Database Models

### User

- Authentication
- Profile Information
- Avatar
- Role Management
- Password Reset Tokens

### Product

- Title
- Description
- Pricing
- Categories
- Images
- Specifications
- Reviews
- Inventory
- Ratings

### Order

- Shipping Information
- Ordered Products
- Payment Information
- Order Status
- Delivery Tracking

---

# REST API

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/register |
| POST | /api/v1/login |
| GET | /api/v1/logout |
| POST | /api/v1/password/forgot |
| PUT | /api/v1/reset/password/:token |

---

## Products

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/products |
| GET | /api/v1/productdetails/:id |
| POST | /api/v1/admin/product/new |
| PUT | /api/v1/admin/product/:id |
| DELETE | /api/v1/admin/product/:id |

---

## Orders

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/order/new |
| GET | /api/v1/order/my |
| GET | /api/v1/orders/:id |
| GET | /api/v1/admin/orders |
| PUT | /api/v1/admin/order/:id |
| DELETE | /api/v1/admin/order/:id |

---

# Authentication & Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Input Validation
- Global Error Handling

---

# Image Management

Product images and specification files are uploaded through Cloudinary using Multer middleware.

Supported Features

- Multiple Image Upload
- Cloud Storage
- Automatic Image URL Generation

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/sharma-furniture-works.git

cd sharma-furniture-works
```

---

## Backend

```bash
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create

```
backend/config/config.env
```

```
PORT=

DB_URL=

JWT_SECRET=

JWT_EXPIRE=

FRONTEND_URL=

CLOUDINARY_NAME=

CLOUDINARY_KEY=

CLOUDINARY_SECRET=

SMTP_EMAIL=

SMTP_PASSWORD=
```

---

# Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

---

# Roadmap

- Stripe Integration
- Razorpay Integration
- Wishlist
- AI Furniture Recommendation
- AR Furniture Preview
- Product Comparison
- Coupons & Offers
- Real-time Notifications
- Analytics Dashboard
- Multi Vendor Support

---

# Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

## Screenshot
<img width="1510" height="1007" alt="Untitled design (2)" src="https://github.com/user-attachments/assets/908bc012-dba6-4c0b-bd39-1d7eb59e5bab" />
<img width="1510" height="1007" alt="Untitled design (4)" src="https://github.com/user-attachments/assets/3118e71b-dbc9-46f9-80f9-dfbd1fd96c6c" />
<img width="1510" height="1007" alt="Untitled design (3)" src="https://github.com/user-attachments/assets/c5e2dfa8-4189-445f-9f25-df60b1b6ef1a" />
<img width="600" height="600" alt="Transform Trending Topics into SEO-Optimized Content with AI (1)" src="https://github.com/user-attachments/assets/d480f13a-f2bd-414f-b5a3-a0948ecb3dbf" />




# Author

**Shashikant Sharma**

Full Stack MERN Developer

- Live Url: https://www.sharmafurnitureworks.com/
- Email: sharmashashikantqwe@gmail.com

---

# License

This project is licensed under the MIT License.

---

<p align="center">

Made with ❤️ using React, Node.js, Express, MongoDB, and Cloudinary.

</p>
