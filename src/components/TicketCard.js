// client/src/components/TicketCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const TicketCard = ({ ticket }) => {
    const isPastDue = ticket.status === 'open' && new Date(ticket.dueDate) < new Date();
    const daysUntilDue = Math.ceil((new Date(ticket.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    const getUrgencyLevel = () => {
        if (isPastDue) return 'overdue';
        if (daysUntilDue <= 1) return 'urgent';
        if (daysUntilDue <= 3) return 'soon';
        return 'normal';
    };

    const urgencyLevel = getUrgencyLevel();

    return (
        <div className={`ticket-card ${urgencyLevel} ${ticket.status}`}>
            <div className="card-header">
                <h3 className="card-title">{ticket.title}</h3>
                <div className="card-badges">
                    <span className={`status-badge status-${ticket.status}`}>
                        <span className="status-icon">
                            {ticket.status === 'open' ? '🔄' : '✅'}
                        </span>
                        <span className="status-text">
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                    </span>
                </div>
            </div>

            <div className="card-content">
                <div className="card-info">
                    <div className="info-item">
                        <span className="info-icon">📅</span>
                        <div className="info-content">
                            <div className="info-label">Due Date</div>
                            <div className="info-value">
                                {format(new Date(ticket.dueDate), 'MMM do, yyyy')}
                            </div>
                        </div>
                    </div>

                    {ticket.status === 'open' && (
                        <div className="info-item urgency-info">
                            <span className="info-icon">
                                {isPastDue ? '⚠️' : daysUntilDue <= 1 ? '🔥' : '⏰'}
                            </span>
                            <div className="info-content">
                                <div className="info-label">Status</div>
                                <div className={`info-value urgency-${urgencyLevel}`}>
                                    {isPastDue 
                                        ? 'OVERDUE' 
                                        : daysUntilDue === 0 
                                        ? 'Due Today' 
                                        : daysUntilDue === 1 
                                        ? 'Due Tomorrow'
                                        : `${daysUntilDue} days left`
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    {ticket.description && (
                        <div className="card-description">
                            <p>{ticket.description.length > 100 
                                ? `${ticket.description.substring(0, 100)}...` 
                                : ticket.description
                            }</p>
                        </div>
                    )}
                </div>

                {ticket.imageUrl && (
                    <div className="card-image">
                        <img 
                            src={ticket.imageUrl} 
                            alt={ticket.title} 
                            className="ticket-thumbnail"
                            loading="lazy"
                        />
                        <div className="image-overlay">
                            <span className="image-indicator">📸</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="card-actions">
                <Link 
                    to={`/tickets/${ticket._id}`} 
                    className="btn btn-primary btn-card-action"
                >
                    <span className="btn-icon">👁️</span>
                    <span>View Details</span>
                </Link>
                
                {ticket.status === 'open' && (
                    <div className="quick-actions">
                        <span className="quick-action-hint">
                            Click to view and manage this ticket
                        </span>
                    </div>
                )}
            </div>

            {urgencyLevel === 'overdue' && (
                <div className="urgency-indicator overdue-indicator">
                    <span className="pulse-dot"></span>
                    <span>OVERDUE</span>
                </div>
            )}
            
            {urgencyLevel === 'urgent' && (
                <div className="urgency-indicator urgent-indicator">
                    <span className="pulse-dot"></span>
                    <span>URGENT</span>
                </div>
            )}
        </div>
    );
};

export default TicketCard;