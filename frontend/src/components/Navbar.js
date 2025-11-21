// Navigation-bar
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{
      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
      boxShadow: '0 4px 12px rgba(230, 194, 0, 0.4)',
      borderBottom: '3px solid #e6c200'
    }}>
      <div className="container">
        <Link className="navbar-brand" to="/" style={{
          color: '#333',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          Notes App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ borderColor: '#333' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" style={{
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-note" style={{
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    Create Note
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link" style={{
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    Welcome, {user?.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light btn-sm" 
                    onClick={handleLogout}
                    style={{
                      borderColor: '#333',
                      color: '#333',
                      fontWeight: 'bold'
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" style={{
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
