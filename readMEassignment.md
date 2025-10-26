# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js (MERN stack). This project demonstrates seamless integration between front-end and back-end components, including database operations, RESTful API communication, authentication, and modern state management.



![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Node.js](https://img.shields.io/badge/Node.js-v18+-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Seeding](#database-seeding)
- [User Guide](#user-guide)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Features
- **User Authentication & Authorization**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Protected routes for authenticated users
  - Role-based access control (User/Admin)

- **Blog Post Management (CRUD)**
  - Create, read, update, and delete blog posts
  - Rich text content support
  - Featured image uploads (optional)
  - Draft and publish functionality
  - Automatic slug generation from titles
  - View counter for each post
  - Tag system for categorization

- **Category System**
  - Multiple categories (Technology, Travel, Food, Lifestyle, Business)
  - Color-coded category badges
  - Filter posts by category
  - Category-based navigation

- **Comment System**
  - Authenticated users can comment on posts
  - Real-time comment display
  - User attribution with avatars
  - Nested comment structure

- **Search & Filter**
  - Full-text search across titles, content, and tags
  - Category filtering
  - Pagination support (9 posts per page)
  - Search results highlighting

- **User Interface**
  - Responsive design with Tailwind CSS v4
  - Modern, clean interface
  - Mobile-friendly navigation
  - Loading states and error handling
  - Optimistic UI updates

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - Modern React with Hooks
- **React Router DOM 6** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt.js** - Password hashing
- **Express Validator** - Input validation
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
mern-blog/
├── client/                          # React frontend
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── PostCard.jsx        # Blog post card
│   │   │   ├── PostForm.jsx        # Create/Edit post form
│   │   │   └── ProtectedRoute.jsx  # Auth route guard
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx            # Homepage with posts grid
│   │   │   ├── PostDetail.jsx      # Single post view
│   │   │   ├── CreatePost.jsx      # Create new post
│   │   │   ├── EditPost.jsx        # Edit existing post
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── Register.jsx        # Registration page
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useApi.js           # API call hook
│   │   ├── context/                 # React Context
│   │   │   └── AuthContext.jsx     # Authentication context
│   │   ├── services/                # API services
│   │   │   └── api.js              # API client configuration
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies
│   ├── vite.config.js              # Vite configuration
│   
│
├── server/                          # Express backend
│   ├── config/                      # Configuration files
│   │   └── db.js                   # Database connection
│   ├── controllers/                 # Route controllers
│   │   ├── authController.js       # Authentication logic
│   │   ├── postController.js       # Post CRUD operations
│   │   └── categoryController.js   # Category operations
│   ├── models/                      # Mongoose models
│   │   ├── User.js                 # User schema
│   │   ├── Post.js                 # Post schema
│   │   └── Category.js             # Category schema
│   ├── routes/                      # API routes
│   │   ├── auth.js                 # Auth endpoints
│   │   ├── posts.js                # Post endpoints
│   │   └── categories.js           # Category endpoints
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.js                 # JWT verification
│   │   ├── errorHandler.js         # Error handling
│   │   └── upload.js               # File upload config
│   ├── utils/                       # Utility functions
│   │   └── validators.js           # Input validation rules
│   ├── uploads/                     # Uploaded files storage
│   ├── seed.js                      # Database seeding script
│   ├── server.js                    # Server entry point
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   └── package.json                 # Dependencies
│
└── README.md                        # Project documentation
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version`

- **MongoDB** (v6.0 or higher)
  - Local installation OR
  - MongoDB Atlas account (cloud database)
  - Verify: `mongod --version`

- **npm** or **yarn** (comes with Node.js)
  - Verify: `npm --version`

- **Git** (for version control)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify: `git --version`

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-Kim-dr.git>
cd mern-stack-integration-Kim-dr.git
```

### Step 2: Install Server Dependencies

```bash
cd server
npm install
```

**Server Dependencies:**
- express: Web framework
- mongoose: MongoDB ODM
- dotenv: Environment variables
- cors: Cross-origin requests
- bcryptjs: Password hashing
- jsonwebtoken: JWT tokens
- express-validator: Input validation
- multer: File uploads
- nodemon: Development auto-reload (dev dependency)

### Step 3: Install Client Dependencies

```bash
cd ../client
npm install
```

**Client Dependencies:**
- react & react-dom: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: Styling
- vite: Build tool

### Step 4: Create Environment Files

**Server Environment (`server/.env`)**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
UPLOAD_PATH=./uploads
JWT_EXPIRE=your_jwt_expiration_time_here
```

**Client Environment (`client/.env`)**
```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Create Uploads Directory

```bash
cd ../server
mkdir uploads
```

## ⚙️ Configuration

### MongoDB Configuration

**Option 1: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/mern-blog
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority
```

### JWT Secret

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use the output in your `.env` file.

## 🎯 Running the Application

### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

Expected output:
```
✅ Connected to MongoDB
📊 Database: mern-blog
🚀 Server running on port 5000
📍 Environment: development
```

**Terminal 2 - Start Frontend Client:**
```bash
cd client
npm run dev
```

Expected output:
```
VITE v6.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Option 2: Production Build

**Build Client:**
```bash
cd client
npm run build
```

**Run Server:**
```bash
cd server
npm start
```

## 🗄️ Database Seeding

Populate the database with sample data:

```bash
cd server
npm run seed
```

**Creates:**
- **3 Users:**
  - Admin (admin@example.com / password123)
  - John Doe (john@example.com / password123)
  - Jane Smith (jane@example.com / password123)

- **5 Categories:**
  - Technology
  - Travel
  - Food
  - Lifestyle
  - Business

- **8 Blog Posts** (7 published, 1 draft)
- **4 Comments** on various posts

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "default-avatar.jpg"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Post Endpoints

#### Get All Posts
```http
GET /posts?page=1&limit=10&category=<categoryId>
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Posts per page (default: 10)
- `category` (string): Filter by category ID

**Response:**
```json
{
  "success": true,
  "count": 7,
  "total": 7,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with React Hooks",
      "excerpt": "Learn how to use React Hooks...",
      "slug": "getting-started-with-react-hooks",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "category": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Technology",
        "color": "#3B82F6"
      },
      "tags": ["React", "JavaScript"],
      "isPublished": true,
      "viewCount": 0,
      "createdAt": "2024-10-26T10:00:00.000Z"
    }
  ]
}
```

#### Get Single Post
```http
GET /posts/:idOrSlug
```

Can use either MongoDB ID or post slug.

#### Create Post (Protected)
```http
POST /posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: "My New Post"
content: "Post content here..."
excerpt: "Short description"
category: "507f1f77bcf86cd799439013"
tags: ["React", "JavaScript"]
isPublished: true
featuredImage: <file> (optional)
```

#### Update Post (Protected)
```http
PUT /posts/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: "Updated Title"
content: "Updated content"
```

#### Delete Post (Protected)
```http
DELETE /posts/:id
Authorization: Bearer <token>
```

#### Add Comment (Protected)
```http
POST /posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post!"
}
```

#### Search Posts
```http
GET /posts/search?q=<searchQuery>
```

### Category Endpoints

#### Get All Categories
```http
GET /categories
```

#### Create Category (Admin Only)
```http
POST /categories
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Technology",
  "description": "Tech related posts",
  "color": "#3B82F6"
}
```

## 👤 User Guide

### For Regular Users

1. **Registration**
   - Click "Register" in navbar
   - Fill in name, email, password
   - Auto-login after registration

2. **Login**
   - Click "Login" in navbar
   - Use credentials:
     - Email: john@example.com
     - Password: password123

3. **Viewing Posts**
   - Browse posts on homepage
   - Click on post card to view full content
   - Use search bar to find specific posts
   - Filter by category using category buttons

4. **Creating Posts**
   - Login required
   - Click "Create Post" in navbar
   - Fill in title, content, select category
   - Optionally add excerpt, tags, and featured image
   - Choose to publish or save as draft

5. **Editing Posts**
   - Only your own posts
   - Click "Edit" button on post detail page
   - Make changes and save

6. **Deleting Posts**
   - Only your own posts
   - Click "Delete" button on post detail page
   - Confirm deletion

7. **Commenting**
   - Login required
   - Navigate to post detail page
   - Write comment in text area
   - Click "Post Comment"

### For Administrators

Admin users have additional privileges:
- Edit/delete any post
- Create categories
- Manage all content

**Admin Credentials:**
- Email: admin@example.com
- Password: password123

## 📸 Screenshots

### Homepage 
![Homepage](screenshots/homepage.png)
- Hero section with search
- Category filters
- Posts grid layout
- Pagination

### Post Detail
![Post Detail](screenshots/postdetail.png)
- Full post content
- Author information
- Category badge
- Tags
- Comments section
- Edit/Delete buttons (if owner)

### Create/Edit Post
![Create/Edit Post](screenshots/editpost.png)
- Form with validation
- Category dropdown
- File upload for images
- Tag input
- Publish toggle

### Authentication
![Login Form](screenshots/login.png)
![Registration Form](screenshots/register.png)
- Login form
- Registration form
- Protected route redirects

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] User registration
- [ ] User login
- [ ] Token persistence
- [ ] Logout functionality
- [ ] Protected route access

**Posts:**
- [ ] View all posts
- [ ] View single post
- [ ] Create post without image
- [ ] Create post with image
- [ ] Edit own post
- [ ] Delete own post
- [ ] Search posts
- [ ] Filter by category
- [ ] Pagination

**Comments:**
- [ ] Add comment
- [ ] View comments
- [ ] Comment attribution

**UI/UX:**
- [ ] Responsive design
- [ ] Loading states
- [ ] Error messages
- [ ] Form validation
- [ ] Navigation

### API Testing with Postman/Thunder Client

Import the following collection:

```json
{
  "info": {
    "name": "MERN Blog API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/register",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    }
  ]
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the client:
```bash
cd client
npm run build
```

2. Deploy `dist` folder to Vercel or Netlify

3. Set environment variable:
```
VITE_API_URL=https://your-api-domain.com/api
```

### Backend Deployment (Heroku/Railway/Render)

1. Create `Procfile`:
```
web: node server.js
```

2. Set environment variables on platform

3. Deploy server directory

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Whitelist IP addresses
3. Update `MONGODB_URI` in production environment

## 🐛 Troubleshooting

### Common Issues

**Issue: Categories not loading**
```bash
# Solution: Run seed script
cd server
npm run seed
```

**Issue: 400 Bad Request when creating post**
- Ensure categories exist (run seed)
- Check that category is selected
- Verify MongoDB is running
- Check browser console for errors

**Issue: MongoDB connection failed**
```bash
# Check if MongoDB is running
# Windows:
net start MongoDB

# Mac/Linux:
brew services start mongodb-community
# OR
sudo systemctl start mongod
```

**Issue: Port already in use**
```bash
# Find and kill process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**Issue: CORS errors**
- Verify client URL in CORS configuration
- Check API base URL in client `.env`
- Restart both servers

**Issue: Token expired**
- Logout and login again
- Clear localStorage: `localStorage.clear()`

### Debug Mode

Enable detailed logging:

**Server:**
```env
NODE_ENV=development
```

**Client:**
Check browser console for:
- FormData entries
- API responses
- Error details

## 📝 Assignment Requirements Met

✅ **Task 1: Project Setup**
- Clear directory structure (client/server)
- MongoDB connection configured
- Express server with middleware
- React with Vite
- Environment variables

✅ **Task 2: Back-End Development**
- RESTful API endpoints (GET, POST, PUT, DELETE)
- Mongoose models (Post, Category, User)
- Input validation (express-validator)
- Error handling middleware

✅ **Task 3: Front-End Development**
- React components (PostCard, PostForm, Layout, etc.)
- React Router navigation
- React hooks (useState, useEffect, useContext, custom hooks)
- Custom useApi hook

✅ **Task 4: Integration and Data Flow**
- API service layer
- Context-based state management
- Form validation
- Loading and error states

✅ **Task 5: Advanced Features**
- User authentication (JWT)
- Image uploads (Multer)
- Pagination
- Search and filtering
- Comments feature

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name
- GitHub: [@Kim-dr](https://github.com/Kim-dr)
- Email: kagasikimberly@gmail.com

## 🙏 Acknowledgments

- MERN Stack Documentation
- MongoDB Documentation
- Express.js Documentation
- React Documentation
- Tailwind CSS Documentation
- Week 4 Assignment Requirements

## 📞 Support

For support and questions:
- Open an issue in the repository
- Email: kagasikimberly@gmail.com
- Documentation: See `/docs` folder

---

**Built with ❤️ using the MERN Stack**