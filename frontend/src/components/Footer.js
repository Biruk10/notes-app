// Footer component
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
      borderTop: '3px solid #e6c200',
      boxShadow: '0 -4px 12px rgba(230, 194, 0, 0.4)',
      marginTop: 'auto',
      padding: '20px 0',
      fontFamily: 'Times New Roman, Times, serif'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p style={{
              margin: '0',
              color: '#333',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Developed by <span style={{
                color: '#28a745',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>Biruk Nigatu</span>
            </p>
            <p style={{
              margin: '5px 0 0 0',
              color: '#555',
              fontSize: '0.9rem'
            }}>
              © {currentYear} Notes App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
