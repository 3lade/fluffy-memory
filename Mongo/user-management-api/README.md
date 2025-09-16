# User Management API

A Node.js REST API for user management with role-based authentication.

## Features
- User registration and login
- JWT authentication with cookies
- Role-based authorization (Manager/Employee)
- CRUD operations for users
- Password hashing with bcrypt

## Setup
1. Install dependencies: 
pm install
2. Configure MongoDB URI in .env file
3. Set SECRET_KEY in .env file
4. Run: 
pm start or 
ode index.js

## API Endpoints
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/user - Get all users (Manager only)
- GET /api/user/:username - Get user by username
- PUT /api/user/update/:username - Update user (Manager only)
- DELETE /api/user/delete/:username - Delete user (Manager only)
