// Create note page component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesAPI } from '../services/api';
import Alert from '../components/Alert';

const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      await notesAPI.create(formData);
      setAlert({ type: 'success', message: 'Note created successfully!' });
      
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to create note.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-4">Create New Note</h2>
              
              <Alert 
                type={alert.type} 
                message={alert.message} 
                onClose={() => setAlert({ type: '', message: '' })}
              />

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter note title"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Enter note description"
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
