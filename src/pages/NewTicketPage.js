// client/src/pages/NewTicketPage.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const NewTicketPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: new Date(),
        priority: 'medium'
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isDragOver, setIsDragOver] = useState(false);
    
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('description', formData.description);
        submitData.append('dueDate', formData.dueDate.toISOString());
        submitData.append('priority', formData.priority);
        
        if (image) {
            submitData.append('image', image);
        }

        try {
            await API.post('/tickets', submitData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            setMessage('🎉 Maintenance ticket created successfully!');
            setIsError(false);
            
            // Show success message then redirect
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            console.error('Error creating ticket:', err);
            setMessage(err.response?.data?.msg || 'Failed to create ticket. Please try again.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) handleImageChange(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const file = e.dataTransfer.files[0];
        if (file) handleImageChange(file);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        document.getElementById('image-input').value = '';
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const getCharacterCount = (text, max) => ({
        current: text.length,
        remaining: max - text.length,
        isOverLimit: text.length > max
    });

    const titleCount = getCharacterCount(formData.title, 100);
    const descriptionCount = getCharacterCount(formData.description, 1000);
    
    const isStepValid = (step) => {
        switch (step) {
            case 1: return formData.title.trim() && !titleCount.isOverLimit;
            case 2: return formData.description.trim() && !descriptionCount.isOverLimit;
            case 3: return true;
            default: return false;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    return (
        <div className="container">
            <div className="new-ticket-container">
                {/* Header Section */}
                <div className="page-header-modern">
                    <div className="header-content">
                        <div className="header-icon">🎫</div>
                        <div className="header-text">
                            <h1>Create New Ticket</h1>
                            <p>Document your maintenance task with detailed information</p>
                        </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="progress-indicator">
                        <div className="step-counter">Step {currentStep} of 3</div>
                        <div className="progress-bar-container">
                            <div 
                                className="progress-bar-fill"
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`message-card ${isError ? 'error' : 'success'}`}>
                        <div className="message-icon">
                            {isError ? '⚠️' : '✅'}
                        </div>
                        <div className="message-text">{message}</div>
                    </div>
                )}

                {/* Form Container */}
                <div className="form-card-modern">
                    <form onSubmit={handleSubmit} className="stepped-form">
                        
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2>📝 Basic Information</h2>
                                    <p>Tell us what needs to be maintained</p>
                                </div>

                                <div className="form-group-modern">
                                    <label className="form-label-modern">
                                        <span className="label-text">Ticket Title</span>
                                        <span className="required-indicator">*</span>
                                    </label>
                                    <div className="input-container">
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="e.g., Fix leaking faucet in kitchen"
                                            className="input-modern"
                                            maxLength="100"
                                            disabled={loading}
                                        />
                                        <div className="input-footer">
                                            <div className={`character-count-modern ${titleCount.isOverLimit ? 'over-limit' : ''}`}>
                                                {titleCount.current}/100 characters
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-modern">
                                    <label className="form-label-modern">
                                        <span className="label-text">Priority Level</span>
                                    </label>
                                    <div className="priority-selector">
                                        {['low', 'medium', 'high'].map((priority) => (
                                            <button
                                                key={priority}
                                                type="button"
                                                className={`priority-btn ${formData.priority === priority ? 'active' : ''}`}
                                                onClick={() => handleInputChange('priority', priority)}
                                                style={{
                                                    '--priority-color': getPriorityColor(priority)
                                                }}
                                                disabled={loading}
                                            >
                                                <div className="priority-indicator"></div>
                                                <span className="priority-label">
                                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Description */}
                        {currentStep === 2 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2>📄 Detailed Description</h2>
                                    <p>Provide comprehensive details about the maintenance task</p>
                                </div>

                                <div className="form-group-modern">
                                    <label className="form-label-modern">
                                        <span className="label-text">Description</span>
                                        <span className="required-indicator">*</span>
                                    </label>
                                    <div className="textarea-container">
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Describe the issue in detail. Include location, tools needed, safety considerations, and any other relevant information..."
                                            className="textarea-modern"
                                            rows="8"
                                            maxLength="1000"
                                            disabled={loading}
                                        ></textarea>
                                        <div className="input-footer">
                                            <div className={`character-count-modern ${descriptionCount.isOverLimit ? 'over-limit' : ''}`}>
                                                {descriptionCount.current}/1000 characters
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group-modern">
                                    <label className="form-label-modern">
                                        <span className="label-text">Due Date</span>
                                        <span className="required-indicator">*</span>
                                    </label>
                                    <div className="date-picker-modern">
                                        <DatePicker
                                            selected={formData.dueDate}
                                            onChange={(date) => handleInputChange('dueDate', date)}
                                            dateFormat="EEEE, MMMM do, yyyy"
                                            minDate={new Date()}
                                            className="input-modern"
                                            placeholderText="Select due date"
                                            disabled={loading}
                                        />
                                        <div className="date-display">
                                            Selected: {formData.dueDate.toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Image Upload */}
                        {currentStep === 3 && (
                            <div className="form-step active">
                                <div className="step-header">
                                    <h2>📸 Visual Documentation</h2>
                                    <p>Add a photo to help illustrate the maintenance task (optional)</p>
                                </div>

                                <div className="image-upload-section">
                                    {!imagePreview ? (
                                        <div 
                                            className={`upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            <input
                                                id="image-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInputChange}
                                                className="file-input-hidden"
                                                disabled={loading}
                                            />
                                            <label htmlFor="image-input" className="upload-area">
                                                <div className="upload-content">
                                                    <div className="upload-icon">📁</div>
                                                    <div className="upload-text">
                                                        <span className="primary-text">Click to upload</span>
                                                        <span className="secondary-text">or drag and drop here</span>
                                                    </div>
                                                    <div className="upload-specs">
                                                        PNG, JPG, GIF • Max 10MB
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="image-preview-section">
                                            <div className="preview-container">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="preview-image"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="remove-image-button"
                                                    disabled={loading}
                                                >
                                                    <span>✕</span>
                                                </button>
                                            </div>
                                            <div className="image-details">
                                                <div className="image-name">{image?.name}</div>
                                                <div className="image-size">
                                                    {(image?.size / 1024 / 1024).toFixed(2)} MB
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="form-navigation">
                            <div className="nav-left">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="nav-btn secondary"
                                        disabled={loading}
                                    >
                                        <span className="btn-icon">←</span>
                                        <span>Previous</span>
                                    </button>
                                )}
                            </div>

                            <div className="nav-right">
                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="nav-btn primary"
                                        disabled={!isStepValid(currentStep) || loading}
                                    >
                                        <span>Next</span>
                                        <span className="btn-icon">→</span>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="nav-btn submit"
                                        disabled={loading || !isStepValid(1) || !isStepValid(2)}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="loading-spinner-small"></div>
                                                <span>Creating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Create Ticket</span>
                                                <span className="btn-icon">🎫</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewTicketPage;