# Online Notes App Management System

A full-stack notes management application with user authentication.

## Tech Stack
- **Frontend**: React.js with Bootstrap
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt

## Project Structure
```
notes-app/
├── backend/          # Express API server
└── frontend/         # React application
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE notes_app;
```

2. Connect to the database and create tables:
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=notes_app
JWT_SECRET=your_secret_key_here
```

4. Start the server:
```bash
npm start
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

Frontend will run on http://localhost:3000

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Notes (Protected Routes)
- `GET /notes` - Get all notes for logged-in user
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Features

✅ User registration and login
✅ Password hashing with bcrypt
✅ JWT-based authentication
✅ Protected routes
✅ CRUD operations for notes
✅ User-specific notes
✅ Clean and responsive UI
✅ Success/error notifications

## Usage

1. Register a new account
2. Login with your credentials
3. Create, edit, view, and delete notes
4. Logout when done
