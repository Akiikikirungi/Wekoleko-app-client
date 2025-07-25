// client/src/pages/NewTicketPage.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const NewTicketPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dueDate', dueDate.toISOString());
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await API.post('/tickets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Maintenance ticket created successfully! Redirecting...');
            setIsError(false);
            setLoading(false);
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            console.error('Error creating ticket:', err.response ? err.response.data : err.message);
            setMessage(err.response?.data?.msg || 'Failed to create ticket. Please try again.');
            setIsError(true);
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        document.getElementById('image').value = '';
    };

    const getCharacterCount = (text, max) => {
        const current = text.length;
        const remaining = max - current;
        return { current, remaining, isOverLimit: remaining < 0 };
    };

    const titleCount = getCharacterCount(title, 100);
    const descriptionCount = getCharacterCount(description, 1000);

    return (
        <div className="container">
            <div className="form-container ticket-form">
                <div className="form-header">
                    <div className="form-logo">
                        <div className="logo-icon">🎫</div>
                        <h2>Create New Maintenance Ticket</h2>
                        <p>Document and track your maintenance tasks efficiently</p>
                    </div>
                </div>

                {message && (
                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                        <strong>{isError ? 'Error:' : 'Success:'}</strong> {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="ticket-creation-form">
                    <div className="form-section">
                        <h3 className="section-title">
                            <span className="section-icon">📝</span>
                            Basic Information
                        </h3>

                        <div className="form-group">
                            <label htmlFor="title">
                                <span className="label-icon">🏷️</span>
                                Ticket Title
                                <span className="required">*</span>
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="Brief description of the maintenance task"
                                    disabled={loading}
                                    maxLength="100"
                                />
                                <div className={`character-count ${titleCount.isOverLimit ? 'over-limit' : ''}`}>
                                    {titleCount.current}/100
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">
                                <span className="label-icon">📄</span>
                                Detailed Description
                                <span className="required">*</span>
                            </label>
                            <div className="input-wrapper">
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Provide detailed notes about the maintenance task, location, tools needed, safety considerations, etc."
                                    disabled={loading}
                                    maxLength="1000"
                                ></textarea>
                                <div className={`character-count ${descriptionCount.isOverLimit ? 'over-limit' : ''}`}>
                                    {descriptionCount.current}/1000
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">
                            <span className="section-icon">📅</span>
                            Scheduling
                        </h3>

                        <div className="form-group date-picker-container">
                            <label htmlFor="dueDate">
                                <span className="label-icon">⏰</span>
                                Due Date
                                <span className="required">*</span>
                            </label>
                            <div className="input-wrapper">
                                <DatePicker
                                    selected={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    dateFormat="EEEE, MMMM do, yyyy"
                                    minDate={new Date()}
                                    required
                                    disabled={loading}
                                    placeholderText="Select due date"
                                />
                            </div>
                            <div className="date-helper">
                                Selected: {dueDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">
                            <span className="section-icon">📸</span>
                            Documentation
                        </h3>

                        <div className="form-group">
                            <label htmlFor="image">
                                <span className="label-icon">🖼️</span>
                                Attach Photo
                                <span className="optional">(Optional)</span>
                            </label>
                            <div className="file-upload-wrapper">
                                {!imagePreview ? (
                                    <div className="file-upload-area">
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            disabled={loading}
                                        />
                                        <div className="upload-content">
                                            <div className="upload-icon">📁</div>
                                            <div className="upload-text">
                                                <strong>Click to upload</strong> or drag and drop
                                            </div>
                                            <div className="upload-hint">
                                                PNG, JPG, GIF up to 10MB
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="image-preview-container">
                                        <img src={imagePreview} alt="Preview" className="image-preview" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="remove-image-btn"
                                            disabled={loading}
                                        >
                                            <span>✕</span>
                                        </button>
                                        <div className="image-info">
                                            <span className="image-name">{image?.name}</span>
                                            <span className="image-size">
                                                {(image?.size / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-create-ticket"
                            disabled={loading || titleCount.isOverLimit || descriptionCount.isOverLimit}
                        >
                            {loading ? (
                                <>
                                    <div className="loading-spinner-small"></div>
                                    <span>Creating Ticket...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Maintenance Ticket</span>
                                    <div className="btn-icon">🎫</div>
                                </>
                            )}
                        </button>
                        
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                            onClick={() => navigate('/dashboard')} 
                            disabled={loading}
                        >
                            <span>Cancel</span>
                            <div className="btn-icon">←</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTicketPage;