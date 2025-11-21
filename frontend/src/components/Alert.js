// Alert component for displaying messages
import React from 'react';

const Alert = ({ type, message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose}></button>
      )}
    </div>
  );
};

export default Alert;
