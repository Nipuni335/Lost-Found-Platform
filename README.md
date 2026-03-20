# 📦 Lost & Found Portal (MERN Stack)

## 📖 Overview

The **Lost & Found Portal** is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js).
It allows users to report lost and found items, browse listings, and helps administrators manage and match items efficiently.

This project was developed as part of an internship/academic requirement to demonstrate full-stack development skills.

---

## 🚀 Features

### 👤 User Features

* 🔐 User Registration & Login
* 🏠 Dashboard with personalized view
* 🔍 Browse all lost & found items
* 📤 Report Lost Items
* 📥 Report Found Items
* 📋 View My Reports (Separated into Lost & Found)
* 👤 Profile Management (Edit Profile)
* 🔔 Internal Notification System (when item is matched)

---

### 🛠️ Admin Features

* 📊 Admin Dashboard
* 🔎 View Matched & Unmatched Items
* 📈 Match Score Visualization
* 📧 Inform Users (Internal Notification System)
* ❌ Remove Incorrect Matches

---

## 🧠 System Workflow

1. User reports a **lost item**
2. Another user reports a **found item**
3. Admin reviews and identifies potential matches
4. Admin clicks **“Inform User”**
5. User receives a **notification inside the system**

> ⚠️ Note: Instead of external email services, an **internal notification system** is implemented for simplicity and security.

---

## 🏗️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS (Custom Styling)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```
client/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   ├── services/
 │   └── App.js

server/
 ├── controllers/
 ├── routes/
 ├── models/
 └── server.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/lost-found-portal.git
```

### 2️⃣ Install dependencies

#### Frontend

```bash
cd client
npm install
npm start
```

#### Backend

```bash
cd server
npm install
node server.js
```

---

## 🌐 Running the Application

* Frontend → `http://localhost:3000`
* Backend → `http://localhost:5000`

---

## 🔐 Authentication

* Users and Admins are stored in MongoDB
* Role-based access:

  * `user`
  * `admin`

---

## 📊 Key Highlights

* ✔ Full MERN Stack Implementation
* ✔ Role-Based Authentication
* ✔ RESTful API Design
* ✔ Clean UI with Responsive Layout
* ✔ Internal Notification System (No external email dependency)

---

## 📸 Screenshots

* Login Page
* Home Dashboard
* Report Lost/Found Forms
* My Reports Page
* Admin Dashboard

---

## 🧑‍💻 Author

**Nipuni Kavindya Dhanapala**

* BSc (Hons) in Information Technology
* MERN Stack Developer

---

## 📌 Future Improvements

* 📱 Mobile Responsive Enhancements
* 🔔 Real-time Notifications
* 🤖 AI-based Item Matching
* 📧 Optional Email Integration
* 📊 Advanced Analytics Dashboard

---

## 📄 License

This project is developed for educational and internship purposes.

---
# Lost-Found-Platform
