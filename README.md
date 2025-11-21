# Notes App

A clean and user-friendly web application intended to help users organize their personal notes. The project will be developed using React as the frontend, Node.js-Express as the backend, and PostgreSQL as the database.
It is developed as part of the Addis Ababa University Full-Stack Web Development Training, serving as the final project for the program.

## About

This is a notes management system where users can create, edit, and delete their personal notes. Each user has their own secure account and can only access their own notes. The app features a clean yellow-themed interface with smooth animations.

## Features

- User registration and login
- Create notes with title and description
- Edit existing notes
- Delete notes
- View all your notes in a dashboard
- Secure authentication with JWT
- Responsive design that works on mobile

## Technologies Used

**Frontend**
- React.js
- React Router for navigation
- Bootstrap 5 (CDN)
- Axios for API requests
- Custom CSS with yellow theme

**Backend**
- Node.js
- Express.js
- PostgreSQL database
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

Make sure you have these installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Biruk10/notes-app.git
cd notes-app
```

2. Set up the backend
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend folder:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=notes_app
JWT_SECRET=your_secret_key
```

4. Create the database and tables
```bash
npm run setup-db
```

5. Start the backend server
```bash
npm start
```

6. In a new terminal, set up the frontend
```bash
cd frontend
npm install
```

7. Create a `.env` file in the frontend folder:
```
REACT_APP_API_URL=http://localhost:5000
```

8. Start the frontend
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

**Authentication**
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

**Notes** (requires authentication)
- `GET /notes` - Get all user's notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Database Structure

The app uses two tables:

**users**
- id (primary key)
- name
- email (unique)
- password (hashed)
- created_at

**notes**
- id (primary key)
- user_id (foreign key)
- title
- description
- created_at

## Deployment

This app can be deployed for free on Render. Check the deployment guides in the repo for instructions.

## Project Structure

```
notes-app/
├── backend/          # Express API server
│   ├── config/       # Database configuration
│   ├── middleware/   # Authentication middleware
│   ├── routes/       # API routes
│   └── server.js     # Main server file
├── frontend/         # React application
│   ├── public/       # Static filesents and pages
└── README.md
```

## Developer

Created by **Biruk Nigatu**

## License

This project is open source and available for personal and educational use.
│   └── src/          # React compon