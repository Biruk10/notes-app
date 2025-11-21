// Edit note page component
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notesAPI } from '../services/api';
import Alert from '../components/Alert';

const EditNote = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await notesAPI.getAll();
      const note = response.data.notes.find(n => n.id === parseInt(id));
      
      if (note) {
        setFormData({
          title: note.title,
          description: note.description || ''
        });
      } else {
        setAlert({ type: 'danger', message: 'Note not found.' });
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'Failed to load note.' });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      await notesAPI.update(id, formData);
      setAlert({ type: 'success', message: 'Note updated successfully!' });
      
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.response?.data?.message || 'Failed to update note.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="mb-4">Edit Note</h2>
              
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
                    {loading ? 'Updating...' : 'Update Note'}
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

export default EditNote;
