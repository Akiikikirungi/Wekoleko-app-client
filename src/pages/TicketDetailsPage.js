// client/src/pages/TicketDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaTrash, FaCheckCircle, FaExclamationCircle, FaArrowLeft, FaTag, FaFileAlt, FaCalendarAlt, FaClock, FaImage, FaTimes, FaSave, FaSpinner, FaCamera } from 'react-icons/fa';

const TicketDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            try {
                const res = await API.put(`/tickets/${id}`, { status: 'resolved' });
                setTicket(prev => ({ ...prev, ...res.data }));
                setMessage('Ticket successfully marked as resolved!');
                setIsError(false);
            } catch (err) {
                console.error('Error resolving ticket:', err.response ? err.response.data : err.message);
                setMessage(err.response?.data?.msg || 'Failed to mark ticket as resolved.');
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm('⚠️ Delete this ticket permanently? This action cannot be undone.')) {
            setIsLoading(true);
            try {
                await API.delete(`/tickets/${id}`);
                setMessage('Ticket deleted successfully! Redirecting...');
                setIsError(false);
                setTimeout(() => navigate('/dashboard'), 1500);
            } catch (err) {
                console.error('Error deleting ticket:', err.response ? err.response.data : err.message);
                setMessage(err.response?.data?.msg || 'Failed to delete ticket.');
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTicket(prev => ({ ...prev, ...res.data }));
            setIsEditing(false);
            setEditImage(null);
            setMessage('Ticket updated successfully!');
            setIsError(false);
        } catch (err) {
            console.error('Error updating ticket:', err.response ? err.response.data : err.message);
            setMessage(err.response?.data?.msg || 'Failed to update ticket.');
            setIsError(true);
        } finally {
            setIsLoading(false);
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
                    <FaSpinner className="loading-spinner spin-icon-large" />
                    <div className="loading-text">Loading ticket details...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="message-card error">
                    <div className="message-icon">❌</div>
                    <span><strong>Error:</strong> {error}</span>
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
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-empty-state">
                        <span>Back to Dashboard</span>
                        <FaArrowLeft className="btn-icon" />
                    </button>
                </div>
            </div>
        );
    }

    const isOverdue = ticket.status === 'open' && new Date(ticket.dueDate) < new Date();
    const daysUntilDue = Math.ceil((new Date(ticket.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <div className="container ticket-details-page">
            <div className="page-header-modern">
                <div className="header-content">
                    <FaTag className="header-icon" />
                    <div>
                        <h1>Ticket Details</h1>
                        <p>Detailed view of your maintenance ticket</p>
                    </div>
                </div>
            </div>

            {message && (
                <div className={`message-card ${isError ? 'error' : 'success'}`}>
                    <div className="message-icon">{isError ? '❌' : '✅'}</div>
                    <span>{message}</span>
                </div>
            )}

            {!isEditing ? (
                <div className="ticket-detail-card">
                    <div className="ticket-detail-header">
                        <div className="ticket-title-section-detail">
                            <h2>{ticket.title}</h2>
                            <div className="ticket-meta-detail">
                                <span className={`status-chip ${ticket.status}`}>
                                    <span className="status-dot"></span>
                                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                </span>
                                {isOverdue && (
                                    <span className="priority-chip danger">
                                        <FaExclamationCircle className="chip-icon" />
                                        Overdue
                                    </span>
                                )}
                                {!isOverdue && ticket.status === 'open' && (
                                    <span className="priority-chip warning">
                                        <FaCalendarAlt className="chip-icon" />
                                        {daysUntilDue > 0 ? `Due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}` : 'Due today'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="ticket-detail-content">
                        <div className="detail-section-modern">
                            <h3 className="detail-title-modern">
                                <FaFileAlt className="detail-icon-modern" />
                                Description
                            </h3>
                            <div className="detail-content-text">
                                <p>{ticket.description}</p>
                            </div>
                        </div>

                        <div className="detail-section-modern">
                            <h3 className="detail-title-modern">
                                <FaClock className="detail-icon-modern" />
                                Timeline
                            </h3>
                            <div className="detail-content-grid">
                                <div className="timeline-item-modern">
                                    <div className="timeline-label">Due Date</div>
                                    <div className="timeline-value">
                                        {format(new Date(ticket.dueDate), 'EEEE, MMMM do, yyyy')}
                                    </div>
                                </div>
                                <div className="timeline-item-modern">
                                    <div className="timeline-label">Created</div>
                                    <div className="timeline-value">
                                        {format(new Date(ticket.createdAt), 'MMM do, yyyy \'at\' h:mm a')}
                                    </div>
                                </div>
                                {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                                    <div className="timeline-item-modern">
                                        <div className="timeline-label">Last Updated</div>
                                        <div className="timeline-value">
                                            {format(new Date(ticket.updatedAt), 'MMM do, yyyy \'at\' h:mm a')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {ticket.imageUrl && (
                            <div className="detail-section-modern">
                                <h3 className="detail-title-modern">
                                    <FaImage className="detail-icon-modern" />
                                    Attached Image
                                </h3>
                                <div className="image-container-modern-detail">
                                    <img 
                                        src={ticket.imageUrl} 
                                        alt={ticket.title} 
                                        className="ticket-image-detail"
                                        onClick={() => window.open(ticket.imageUrl, '_blank')}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="ticket-detail-actions">
                        {ticket.status === 'open' && (
                            <button onClick={handleMarkResolved} className="nav-btn primary" disabled={isLoading}>
                                {isLoading ? (
                                    <FaSpinner className="spin-icon" />
                                ) : (
                                    <FaCheckCircle className="btn-icon" />
                                )}
                                <span>Mark as Resolved</span>
                            </button>
                        )}
                        <button onClick={() => setIsEditing(true)} className="nav-btn secondary">
                            <FaEdit className="btn-icon" />
                            <span>Edit Ticket</span>
                        </button>
                        <button onClick={handleDelete} className="nav-btn danger" disabled={isLoading}>
                            {isLoading ? (
                                <FaSpinner className="spin-icon" />
                            ) : (
                                <FaTrash className="btn-icon" />
                            )}
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            ) : (
                // Edit Mode Form
                <div className="form-card-modern edit-ticket-form">
                    <form onSubmit={handleEditSubmit}>
                        <h3 className="section-title">Edit Ticket Information</h3>

                        <div className="form-group-modern">
                            <label htmlFor="editTitle" className="form-label-modern">
                                Title
                            </label>
                            <input
                                type="text"
                                id="editTitle"
                                className="input-modern"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group-modern">
                            <label htmlFor="editDescription" className="form-label-modern">
                                Description
                            </label>
                            <textarea
                                id="editDescription"
                                className="textarea-modern"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="form-section-edit-grid">
                            <div className="form-group-modern">
                                <label htmlFor="editDueDate" className="form-label-modern">
                                    Due Date
                                </label>
                                <DatePicker
                                    selected={editDueDate}
                                    onChange={(date) => setEditDueDate(date)}
                                    dateFormat="EEEE, MMMM do, yyyy"
                                    className="input-modern"
                                />
                            </div>

                            <div className="form-group-modern">
                                <label htmlFor="editStatus" className="form-label-modern">
                                    Status
                                </label>
                                <select
                                    id="editStatus"
                                    className="input-modern"
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                >
                                    <option value="open">Open</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group-modern">
                            <label htmlFor="editImage" className="form-label-modern">
                                Update Image (Optional)
                            </label>
                            <div className="image-upload-edit">
                                <label htmlFor="editImage" className="upload-dropzone-edit">
                                    <FaCamera className="upload-icon" />
                                    <span>Drag and drop an image or <span className="primary-text">click to upload</span></span>
                                    <input
                                        type="file"
                                        id="editImage"
                                        accept="image/*"
                                        className="file-input-hidden"
                                        onChange={handleEditImageChange}
                                    />
                                </label>
                                {imagePreview && (
                                    <div className="image-preview-edit">
                                        <img src={imagePreview} alt="Preview" className="preview-image-edit" />
                                        <button type="button" className="remove-image-button-edit" onClick={() => { setEditImage(null); setImagePreview(''); }}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-navigation">
                            <button type="submit" className="nav-btn primary" disabled={isLoading}>
                                {isLoading ? (
                                    <FaSpinner className="spin-icon" />
                                ) : (
                                    <FaSave className="btn-icon" />
                                )}
                                <span>Save Changes</span>
                            </button>
                            <button type="button" onClick={handleCancelEdit} className="nav-btn secondary">
                                <FaTimes className="btn-icon" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
            
            <div className="back-to-dashboard">
                <Link to="/dashboard" className="nav-btn">
                    <FaArrowLeft className="btn-icon" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>
        </div>
    );
};

export default TicketDetailsPage;