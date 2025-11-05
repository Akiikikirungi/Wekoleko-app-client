import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';

const TicketCard = ({ ticket, ...motionProps }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    const isPastDue = ticket.status === 'open' && new Date(ticket.dueDate) < new Date();
    const daysUntilDue = Math.ceil((new Date(ticket.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    const getUrgencyLevel = () => {
        if (isPastDue) return 'overdue';
        if (daysUntilDue <= 1) return 'urgent';
        if (daysUntilDue <= 3) return 'soon';
        return 'normal';
    };

    const formatDueDate = (date) => {
        const dueDate = new Date(date);
        if (isToday(dueDate)) return 'Today';
        if (isTomorrow(dueDate)) return 'Tomorrow';
        if (isYesterday(dueDate)) return 'Yesterday';
        return format(dueDate, 'MMM do, yyyy');
    };

    const getUrgencyDisplay = () => {
        if (isPastDue) {
            const overdueDays = Math.abs(daysUntilDue);
            return {
                text: overdueDays === 1 ? '1 day overdue' : `${overdueDays} days overdue`,
                icon: '🚨',
                className: 'urgency-overdue'
            };
        }
        if (daysUntilDue === 0) return { text: 'Due Today', icon: '⏰', className: 'urgency-urgent' };
        if (daysUntilDue === 1) return { text: 'Due Tomorrow', icon: '📅', className: 'urgency-soon' };
        if (daysUntilDue <= 3) return { text: `${daysUntilDue} days left`, icon: '⏰', className: 'urgency-soon' };
        return { text: `${daysUntilDue} days left`, icon: '📅', className: 'urgency-normal' };
    };

    const urgencyLevel = getUrgencyLevel();
    const urgencyDisplay = getUrgencyDisplay();
    const createdDate = format(new Date(ticket.createdAt), 'MMM do, yyyy');

    return (
        <motion.div 
            className={`ticket-card-modern ${urgencyLevel} ${ticket.status}`}
            {...motionProps}
        >
            {/* Priority Indicator */}
            {(urgencyLevel === 'overdue' || urgencyLevel === 'urgent') && (
                <div className="priority-ribbon">
                    <span className="priority-text">
                        {urgencyLevel === 'overdue' ? 'OVERDUE' : 'URGENT'}
                    </span>
                </div>
            )}

            {/* Card Header */}
            <div className="card-header-modern">
                <div className="ticket-title-section">
                    <h3 className="ticket-title-modern">{ticket.title}</h3>
                    <div className="ticket-meta">
                        <span className="creation-date">
                            <span className="meta-icon">📝</span>
                            Created {createdDate}
                        </span>
                    </div>
                </div>
                
                <div className="status-section">
                    <div className={`status-chip ${ticket.status}`}>
                        <span className="status-dot"></span>
                        <span className="status-label">
                            {ticket.status === 'open' ? 'Active' : 'Completed'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Due Date Section */}
            <div className="due-date-section">
                <div className="due-date-card">
                    <div className="due-date-icon">
                        <span>{urgencyDisplay.icon}</span>
                    </div>
                    <div className="due-date-info">
                        <span className="due-date-label">Due Date</span>
                        <span className="due-date-value">{formatDueDate(ticket.dueDate)}</span>
                        {ticket.status === 'open' && (
                            <span className={`urgency-status ${urgencyDisplay.className}`}>
                                {urgencyDisplay.text}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            {ticket.description && (
                <div className="description-section">
                    <p className="description-text">
                        {ticket.description.length > 120 
                            ? `${ticket.description.substring(0, 120)}...` 
                            : ticket.description
                        }
                    </p>
                </div>
            )}

            {/* Image Section */}
            {ticket.imageUrl && (
                <div className="image-section">
                    <div className="image-container-modern">
                        {!imageError ? (
                            <>
                                {!imageLoaded && (
                                    <div className="image-skeleton">
                                        <div className="skeleton-shimmer"></div>
                                        <span className="loading-icon">📷</span>
                                    </div>
                                )}
                                <img 
                                    src={ticket.imageUrl} 
                                    alt={ticket.title} 
                                    className={`ticket-image-modern ${imageLoaded ? 'loaded' : ''}`}
                                    loading="lazy"
                                    onLoad={() => setImageLoaded(true)}
                                    onError={() => setImageError(true)}
                                    style={{ display: imageLoaded ? 'block' : 'none' }}
                                />
                            </>
                        ) : (
                            <div className="image-error">
                                <span className="error-icon">🖼️</span>
                                <span className="error-text">Image not available</span>
                            </div>
                        )}
                        
                        <div className="image-overlay-modern">
                            <span className="overlay-text">View Image</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Section */}
            <div className="card-actions-modern">
                <Link 
                    to={`/tickets/${ticket._id}`} 
                    className="view-details-btn"
                >
                    <span className="btn-content">
                        <span className="btn-icon-modern">👁️</span>
                        <span className="btn-text">View Details</span>
                    </span>
                    <div className="btn-arrow">→</div>
                </Link>
                
                <div className="quick-info">
                    <span className="ticket-id">#{ticket._id.slice(-6).toUpperCase()}</span>
                </div>
            </div>

            {/* Progress Bar for Due Date */}
            {ticket.status === 'open' && (
                <div className="progress-section">
                    <div className="progress-bar">
                        <div 
                            className={`progress-fill ${urgencyLevel}`}
                            style={{
                                width: `${Math.min(100, Math.max(10, 
                                    isPastDue ? 100 : (1 - (daysUntilDue / 30)) * 100
                                ))}%`
                            }}
                        ></div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TicketCard;