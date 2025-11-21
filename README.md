# 📝 Online Notes App Management System

A full-stack web application for creating, managing, and organizing personal notes with secure user authentication.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### User Authentication
- ✅ User registration with name, email, and password
- ✅ Secure login system
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected routes and sessions

### Notes Management
- ✅ Create notes with title and description
- ✅ View all personal notes in dashboard
- ✅ Edit existing notes
- ✅ Delete unwanted notes
- ✅ User-specific notes (complete privacy)
- ✅ Real-time success/error notifications

### User Interface
- ✅ Clean and intuitive design
- ✅ Responsive layout (mobile-friendly)
- ✅ Custom yellow theme with Times New Roman typography
- ✅ Smooth animations and transitions
- ✅ Bootstrap 5 components

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Bootstrap 5** - CSS framework (via CDN)
- **Custom CSS** - Yellow theme styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- Foreign key relationships
- Indexed queries for performance

## 📁 Project Structure

```
notes-app/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── notes.js             # Notes CRUD routes
│   ├── .env.example             # Environment variables template
│   ├── database.sql             # Database schema
│   ├── package.json             # Backend dependencies
│   ├── server.js                # Express server
│   ├── setup-database.js        # Database setup script
│   └── test-connection.js       # Database connection test
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.js         # Alert component
│   │   │   ├── Footer.js        # Footer component
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   └── PrivateRoute.js  # Protected route wrapper
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── CreateNote.js    # Create note page
│   │   │   ├── Dashboard.js     # Dashboard page
│   │   │   ├── EditNote.js      # Edit note page
│   │   │   ├── Login.js         # Login page
│   │   │   └── Register.js      # Register page
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── App.js               # Main app component
│   │   ├── index.css            # Global styles
│   │   └── index.js             # Entry point
│   ├── .env.example             # Environment variables template
│   └── package.json             # Frontend dependencies
│
├── .gitignore                   # Git ignore file
├── README.md                    # Project documentation
├── DEPLOYMENT-GUIDE.md          # Deployment instructions
├── GIT-GUIDE.md                 # Git usage guide
├── PGADMIN-SETUP.md             # pgAdmin setup guide
├── RAILWAY-DEPLOY.md            # Railway deployment guide
└── SETUP-GUIDE.md               # Local setup guide
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Git

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/notes-app.git
cd notes-app
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your database credentials
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_NAME=notes_app
# JWT_SECRET=your_secret_key
```

#### 3. Database Setup

**Option A: Using Node.js Script (Recommended)**
```bash
npm run setup-db
```

**Option B: Using pgAdmin**
1. Open pgAdmin4
2. Create database: `notes_app`
3. Run SQL from `database.sql`

#### 4. Start Backend Server

```bash
npm start
# Server runs on http://localhost:5000
```

#### 5. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env
# REACT_APP_API_URL=http://localhost:5000
```

#### 6. Start Frontend

```bash
npm start
# App opens at http://localhost:3000
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Notes (Protected)
- `GET /notes` - Get all user notes
- `POST /notes` - Create new note
- `PUT /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notes Table
```sql
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🌐 Deployment

### Deploy to Railway (Recommended)
See [RAILWAY-DEPLOY.md](RAILWAY-DEPLOY.md) for detailed instructions.

### Deploy to Vercel + Render
See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.

### Deploy to GitHub Pages
See [GITHUB-PAGES-DEPLOY.md](GITHUB-PAGES-DEPLOY.md) for detailed instructions.

## 🧪 Testing

### Test Database Connection
```bash
cd backend
npm run test-db
```

### Test API Endpoints
Use Postman or curl to test endpoints:
```bash
# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes with middleware
- SQL injection prevention with parameterized queries
- CORS configuration
- Environment variable protection
- Input validation

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Custom yellow gradient theme
- Times New Roman typography
- Smooth hover effects and transitions
- Loading states and spinners
- Success/error alert messages
- Card-based note layout
- Intuitive navigation

## 📝 Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View all your notes
4. **Create Note**: Click "Create New Note" button
5. **Edit Note**: Click "Edit" on any note card
6. **Delete Note**: Click "Delete" on any note card
7. **Logout**: Click "Logout" in the navbar

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Developed by Biruk Nigatu**

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the robust backend framework
- PostgreSQL for the reliable database
- Bootstrap team for the UI components

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🔗 Links

- [Live Demo](#) - Add your deployed link here
- [Documentation](./SETUP-GUIDE.md)
- [Deployment Guide](./DEPLOYMENT-GUIDE.md)
- [API Documentation](#)

---

⭐ Star this repository if you find it helpful!