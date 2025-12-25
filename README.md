# 🎓 eTuitionBd – Tuition Management System

## 📌 Project Overview
**eTuitionBd** is a full-stack Tuition Management System that connects **students**, **tutors**, and **admins** on a single platform.  
It allows students to post tuition requirements, tutors to apply for jobs, and admins to manage users, tuition posts, and platform activities securely.

This project was built as a **job task assessment** to demonstrate real-world MERN stack development skills.

---

## 🎯 Project Purpose
- Find **qualified tutors** and **verified tuition posts**
- Reduce communication gaps between students and tutors
- Enable **secure digital payments**
- Provide admins with full monitoring & control
- Deliver a **production-ready web application**

---

## 🌐 Live Links
- **Client:** https://etutionbd-rh.web.app  
- **Server:** https://e-tution-bd-server-chi.vercel.app  

---

## 🔐 Authentication & Authorization
- Firebase Authentication (Email & Password)
- Google Login (Default role: Student)
- JWT-based authentication
- Role-based routing:
  - Student Dashboard
  - Tutor Dashboard
  - Admin Dashboard
- Protected routes (no redirect on reload)
- Token verification:
  - Role
  - Access level
  - Token expiration

---

## 🏠 Public Pages
- Home
- Tuitions
- Tuition Details
- Tutors
- Tutor Profile
- About
- Contact
- Login / Register
- 404 Error Page

---

## 🏡 Home Page Features
- Hero Section
- Latest Tuition Posts (Dynamic)
- Latest Tutors (Dynamic)
- Framer Motion animations (min 2)
- How the Platform Works (3 steps)
- Why Choose Us section

---

## 📊 Dashboard Features

### 👨‍🎓 Student Dashboard
**Pages**
- My Tuitions
- Post New Tuition
- Applied Tutors
- Payments
- Profile Settings

**Functionalities**
- Create tuition post (status: Pending)
- Update tuition (default values shown)
- Delete tuition with confirmation
- View tutor applications
- Approve tutor → Stripe payment → Tutor approved
- Reject tutor applications

> Tutor approval is completed **only after successful payment**

---

### 👨‍🏫 Tutor Dashboard
**Pages**
- My Applications
- Ongoing Tuitions
- Revenue History

**Functionalities**
- Apply to tuition via modal form
- Track application status
- Update or delete applications before approval

---

### 🛡️ Admin Dashboard
**User Management**
- View users
- Update user information
- Change roles (Student / Tutor / Admin)
- Delete users

**Tuition Management**
- Review tuition posts
- Approve or reject tuition posts

**Reports & Analytics**
- Total platform earnings
- Transaction history
- Charts & graphs

---

## 💳 Payment System
- Stripe payment integration
- Secure checkout
- Payment history tracking
- Tutor approval linked to payment success

---

## 🔍 Search, Filter & Pagination
- Search by subject & location
- Sort by budget & date
- Advanced filters (class, subject, location)
- Pagination on tuition listing page

---

## 🎨 UI/UX Design
- Fully responsive design
- Sticky navbar (DaisyUI)
- Consistent color theme
- Equal image sizes
- Reusable button styles
- Clean spacing & alignment
- Recruiter-friendly dashboard
- Profile sidebar included

---

## ⏳ Loading & Error Handling
- Full-screen loading spinner
- Custom 404 error page
- Friendly UI with navigation

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Hook Form
- TanStack Query
- Axios
- Firebase
- Stripe.js
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Stripe
- dotenv
- CORS

---
### 👤 Author
- Rakibul Hossain Bhuiya
- 📧 Email: rakibulhossainbhuiya@gmail.com
