# 🛍️ Dokan E-Commerce Management System (MERN Stack)

## 📌 Overview

This is a full-fledged **E-Commerce Web Application** built using the **MERN Stack** (MongoDB, Express, React, Node.js). It provides a seamless experience for both **customers** and **admins**, featuring product listings, cart management, order tracking, and image uploads to Cloudinary via Multer.

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, React Context API
- **Image Upload**: Multer + Cloudinary

## 📂 Folder Structure

### 📦 `backend`
```
📦 backend
├── 📂 config
│   └── db.js          
├── 📂 controllers
│   ├── admin.controllers.js  
│   ├── cart.controllers.js  
│   ├── order.controllers.js 
│   └── product.controllers.js   
│   └── user.controllers.js   
├── 📂 middleware
│   ├── adminAuth.middlewares.js
│   ├── auth.middlewares.js
│   └── multer.middlewares.js   
├── 📂 models
│   ├── product.models.js       
│   ├── user.models.js         
│   └── order.models.js       
├── 📂 routes
│   ├── admin.routes.js      
│   ├── cart.routes.js        
│   ├── product.routes.js    
│   └── order.routes.js
│   └── user.routes.js
├── 📂 utils
│   ├── cloudinary.js        
├── .env
└── server.js                  # App entry point
```

### 📦 `frontend`
```
📦 frontend
├── 📂 public            
├── 📂 src
│   ├── 📂 admin
│   │   ├── components
│   │   ├── layout  
│   │   └── pages
│   │   └── index.jsx
│   ├── 📂 api           
│   ├── 📂 assets        
│   ├── 📂 components     
│   ├── 📂 context
│   │   ├── authContext.js 
│   │   ├── cartContext.js     
│   │   └── productContext.js 
│   ├── 📂 pages
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│   ├── env
```

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone (https://github.com/PustamRai/dokan/)
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

#### 🔐 Environment Variables (.env in /backend)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin_email
ADMIN_PASSWORD=admin_password
```

#### ▶️ Start Backend Server
```bash
npm run start
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
```

#### ▶️ Start Frontend (Vite)
```bash
npm run dev
```

### 🔐 Admin Credentials
Use the following credentials to log in as an admin:
```
📧 Email: admin@example.com
🔐 Password: admin123
```

## ⚡ Features

### 👤 User Side
- Register / Login
- View all products
- Filter by category 
- Add items to cart
- Place orders
- Track order status

### 🛠️ Admin Panel
- Add 
- Manage orders
- Update order status
- Dashboard overview

### 📸 Image Uploads
- Upload product images using Multer
- Images are stored in Cloudinary

## 🔗 API Endpoints

### 🔑 Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/admin/login | Login admin |
| GET | /api/admin/dashboard | dashboard |
| GET | /api/admin/list | all order list |
| POST | /api/admin/order/:id/status | track order status |

### 🛍️ Product Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/product/add | Add new product (Admin only) |
| GET | /api/product/list | Get all products |
| POST | /api/product/remove/:productId | remove product by ID |
| POST | /api/product/single/:productId | single product |

### 🛒 Cart Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/cart/add | Add item to cart |
| GET | /api/cart/get | Get user cart |
| POST | /api/cart/update | update item from cart |

### 📦 Order Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/order/place-order | Place an order |
| GET | /api/order/userorders | Get all orders |
| GET | /api/order-status/:id | Update order status (Admin) |

## 🎨 UI Highlights

- 💡 Clean, responsive UI (Tailwind CSS)
- 🗂️ Organized structure
- ✅ Intuitive user and admin experiences
- 🔍 Product filters and search
- 📊 Admin order/product management panel

## 🔮 Future Enhancements

- 🔐 Role-based dashboards
- 💸 Payment integration
- 🌐 SEO optimization
- 💬 Product reviews and ratings

## 🤝 Connect with Me

If you found this project useful, feel free to connect:

- 💼 [LinkedIn](https://www.linkedin.com/in/pustamrai)
