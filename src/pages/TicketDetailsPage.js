// client/src/pages/TicketDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

const TicketDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // State for editing
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDueDate, setEditDueDate] = useState(new Date());
    const [editStatus, setEditStatus] = useState('');
    const [editImage, setEditImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await API.get(`/tickets/${id}`);
                setTicket(res.data);
                // Initialize edit states
                setEditTitle(res.data.title);
                setEditDescription(res.data.description);
                setEditDueDate(new Date(res.data.dueDate));
                setEditStatus(res.data.status);
                setImagePreview(res.data.imageUrl);
            } catch (err) {
                console.error('Error fetching ticket:', err.response ? err.response.data : err.message);
                setError(err.response?.data?.msg || 'Failed to fetch ticket.');
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    const handleMarkResolved = async () => {
        if (window.confirm('Mark this maintenance ticket as resolved?')) {
            try {
                await API.put(`/tickets/${id}`, { status: 'resolved' });
                setTicket(prev => ({ ...prev, status: 'resolved' }));
                setMessage('Ticket successfully marked as resolved!');
                setIsError(false);
            } catch (err) {
                console.error('Error resolving ticket:', err.response ? err.response.data : err.message);
                setMessage(err.response?.data?.msg || 'Failed to mark ticket as resolved.');
                setIsError(true);
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm('⚠️ Delete this ticket permanently? This action cannot be undone.')) {
            try {
                await API.delete(`/tickets/${id}`);
                setMessage('Ticket deleted successfully! Redirecting...');
                setIsError(false);
                setTimeout(() => navigate('/dashboard'), 1500);
            } catch (err) {
                console.error('Error deleting ticket:', err.response ? err.response.data : err.message);
                setMessage(err.response?.data?.msg || 'Failed to delete ticket.');
                setIsError(true);
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        const formData = new FormData();
        formData.append('title', editTitle);
        formData.append('description', editDescription);
        formData.append('dueDate', editDueDate.toISOString());
        formData.append('status', editStatus);
        if (editImage) {
            formData.append('image', editImage);
        }

        try {
            const res = await API.put(`/tickets/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTicket(res.data);
            setIsEditing(false);
            setEditImage(null);
            setMessage('Ticket updated successfully!');
            setIsError(false);
        } catch (err) {
            console.error('Error updating ticket:', err.response ? err.response.data : err.message);
            setMessage(err.response?.data?.msg || 'Failed to update ticket.');
            setIsError(true);
        }
    };

    const handleEditImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setEditImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setEditImage(null);
            setImagePreview(ticket?.imageUrl || '');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle(ticket.title);
        setEditDescription(ticket.description);
        setEditDueDate(new Date(ticket.dueDate));
        setEditStatus(ticket.status);
        setEditImage(null);
        setImagePreview(ticket.imageUrl);
        setMessage('');
        setIsError(false);
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading ticket details...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="container">
                <div className="empty-state">
                    <div className="empty-icon">❓</div>
                    <h3>Ticket not found</h3>
                    <p>The requested maintenance ticket could not be found or is not accessible.</p>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                        <span>Back to Dashboard</span>
                        <div className="btn-icon">←</div>
                    </button>
                </div>
            </div>
        );
    }

    const isOverdue = ticket.status === 'open' && new Date(ticket.dueDate) < new Date();
    const daysUntilDue = Math.ceil((new Date(ticket.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <div className="container">
            <div className="ticket-detail-card">
                {message && (
                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                        <strong>{isError ? 'Error:' : 'Success:'}</strong> {message}
                    </div>
                )}

                {!isEditing ? (
                    <>
                        <div className="ticket-header">
                            <div className="ticket-title-section">
                                <h2 className="ticket-title">{ticket.title}</h2>
                                <div className="ticket-meta">
                                    <span className={`status-badge ${ticket.status}`}>
                                        <span className="status-icon">
                                            {ticket.status === 'open' ? '🔄' : '✅'}
                                        </span>
                                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                    </span>
                                    {isOverdue && (
                                        <span className="overdue-badge">
                                            <span className="overdue-icon">⚠️</span>
                                            Overdue
                                        </span>
                                    )}
                                    {!isOverdue && ticket.status === 'open' && (
                                        <span className="days-remaining">
                                            {daysUntilDue > 0 ? `${daysUntilDue} days remaining` : 'Due today'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="ticket-content">
                            <div className="detail-section">
                                <h3 className="detail-title">
                                    <span className="detail-icon">📝</span>
                                    Description
                                </h3>
                                <div className="detail-content">
                                    <p>{ticket.description}</p>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3 className="detail-title">
                                    <span className="detail-icon">📅</span>
                                    Timeline
                                </h3>
                                <div className="detail-content timeline-grid">
                                    <div className="timeline-item">
                                        <div className="timeline-label">Due Date</div>
                                        <div className="timeline-value">
                                            {format(new Date(ticket.dueDate), 'EEEE, MMMM do, yyyy')}
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-label">Created</div>
                                        <div className="timeline-value">
                                            {format(new Date(ticket.createdAt), 'MMM do, yyyy \'at\' h:mm a')}
                                        </div>
                                    </div>
                                    {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                                        <div className="timeline-item">
                                            <div className="timeline-label">Last Updated</div>
                                            <div className="timeline-value">
                                                {format(new Date(ticket.updatedAt), 'MMM do, yyyy \'at\' h:mm a')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {ticket.imageUrl && (
                                <div className="detail-section">
                                    <h3 className="detail-title">
                                        <span className="detail-icon">📸</span>
                                        Attached Image
                                    </h3>
                                    <div className="detail-content">
                                        <div className="image-container">
                                            <img 
                                                src={ticket.imageUrl} 
                                                alt={ticket.title} 
                                                className="ticket-image"
                                                onClick={() => window.open(ticket.imageUrl, '_blank')}
                                            />
                                            <div className="image-overlay">
                                                <span>Click to view full size</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="ticket-actions">
                            {ticket.status === 'open' && (
                                <button onClick={handleMarkResolved} className="btn btn-primary action-btn">
                                    <span className="btn-icon">✅</span>
                                    <span>Mark as Resolved</span>
                                </button>
                            )}
                            <button onClick={() => setIsEditing(true)} className="btn btn-secondary action-btn">
                                <span className="btn-icon">✏️</span>
                                <span>Edit Ticket</span>
                            </button>
                            <button onClick={handleDelete} className="btn btn-danger action-btn">
                                <span className="btn-icon">🗑️</span>
                                <span>Delete</span>
                            </button>
                            <button onClick={() => navigate('/dashboard')} className="btn action-btn">
                                <span className="btn-icon">←</span>
                                <span>Back to Dashboard</span>
                            </button>
                        </div>
                    </>
                ) : (
                    // Edit Mode Form
                    <div className="edit-mode">
                        <div className="form-header">
                            <div className="form-logo">
                                <div className="logo-icon">✏️</div>
                                <h2>Edit Maintenance Ticket</h2>
                                <p>Update ticket information and status</p>
                            </div>
                        </div>

                        <form onSubmit={handleEditSubmit} className="edit-form">
                            <div className="form-section">
                                <h3 className="section-title">
                                    <span className="section-icon">📝</span>
                                    Basic Information
                                </h3>

                                <div className="form-group">
                                    <label htmlFor="editTitle">
                                        <span className="label-icon">🏷️</span>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="editTitle"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        required
                                        placeholder="Ticket title"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="editDescription">
                                        <span className="label-icon">📄</span>
                                        Description
                                    </label>
                                    <textarea
                                        id="editDescription"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        required
                                        placeholder="Detailed description"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="section-title">
                                    <span className="section-icon">⚙️</span>
                                    Settings
                                </h3>

                                <div className="form-row">
                                    <div className="form-group date-picker-container">
                                        <label htmlFor="editDueDate">
                                            <span className="label-icon">📅</span>
                                            Due Date
                                        </label>
                                        <DatePicker
                                            selected={editDueDate}
                                            onChange={(date) => setEditDueDate(date)}
                                            dateFormat="EEEE, MMMM do, yyyy"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="editStatus">
                                            <span className="label-icon">🔄</span>
                                            Status
                                        </label>
                                        <select
                                            id="editStatus"
                                            value={editStatus}
                                            onChange={(e) => setEditStatus(e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="open">🔄 Open</option>
                                            <option value="resolved">✅ Resolved</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="section-title">
                                    <span className="section-icon">📸</span>
                                    Image
                                </h3>

                                <div className="form-group">
                                    <label htmlFor="editImage">
                                        <span className="label-icon">🖼️</span>
                                        Update Image (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        id="editImage"
                                        accept="image/*"
                                        onChange={handleEditImageChange}
                                    />
                                    {imagePreview && (
                                        <div className="image-preview-edit">
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="preview-image"
                                            />
                                            <div className="preview-label">
                                                {editImage ? 'New image selected' : 'Current image'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary action-btn">
                                    <span className="btn-icon">💾</span>
                                    <span>Save Changes</span>
                                </button>
                                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary action-btn">
                                    <span className="btn-icon">❌</span>
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetailsPage;