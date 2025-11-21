// Main App component with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateNote from './pages/CreateNote'
import EditNote from './pages/EditNote'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <Navbar />
          <div style={{ flex: '1' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/create-note" element={<PrivateRoute><CreateNote /></PrivateRoute>} />
              <Route path="/edit-note/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
