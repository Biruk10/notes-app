// Dashboard page - displays all notes
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notesAPI } from '../services/api';
import Alert from '../components/Alert';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getAll();
      setNotes(response.data.notes);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: 'Failed to load notes.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesAPI.delete(id);
      setAlert({ type: 'success', message: 'Note deleted successfully!' });
      fetchNotes();
    } catch (error) {
      setAlert({
        type: 'danger',
        message: 'Failed to delete note.'
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Notes</h2>
        <Link to="/create-note" className="btn btn-primary">
          + Create New Note
        </Link>
      </div>

      <Alert 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ type: '', message: '' })}
      />

      {notes.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted">No notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="row">
          {notes.map((note) => (
            <div key={note.id} className="col-md-4 mb-4">
              <div className="card note-card h-100">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text text-muted small">
                    {formatDate(note.created_at)}
                  </p>
                  <p className="card-text">
                    {note.description?.substring(0, 100)}
                    {note.description?.length > 100 && '...'}
                  </p>
                </div>
                <div className="card-footer bg-white">
                  <Link 
                    to={`/edit-note/${note.id}`} 
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(note.id)}
                    className="btn btn-sm btn-outline-danger ms-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
