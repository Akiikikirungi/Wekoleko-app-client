// client/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import TicketCard from '../components/TicketCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await API.get('/tickets');
                setTickets(res.data);
            } catch (err) {
                console.error('Error fetching tickets:', err.response ? err.response.data : err.message);
                setError('Failed to fetch tickets. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading your maintenance tickets...</div>
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

    const openTickets = tickets.filter(ticket => ticket.status === 'open');
    const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved');
    const overdueTickets = openTickets.filter(ticket => new Date(ticket.dueDate) < new Date());

    return (
        <div className="container">
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h2>Your Maintenance Dashboard</h2>
                    <p>Manage and track all your maintenance tasks in one place</p>
                </div>
                
                <div className="dashboard-actions">
                    <Link to="/new" className="btn btn-primary btn-create">
                        <span>Create New Ticket</span>
                        <div className="btn-icon">+</div>
                    </Link>
                </div>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card stat-total">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <div className="stat-number">{tickets.length}</div>
                        <div className="stat-label">Total Tickets</div>
                    </div>
                </div>
                <div className="stat-card stat-open">
                    <div className="stat-icon">🔄</div>
                    <div className="stat-content">
                        <div className="stat-number">{openTickets.length}</div>
                        <div className="stat-label">Open Tickets</div>
                    </div>
                </div>
                <div className="stat-card stat-resolved">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <div className="stat-number">{resolvedTickets.length}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>
                <div className="stat-card stat-overdue">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-content">
                        <div className="stat-number">{overdueTickets.length}</div>
                        <div className="stat-label">Overdue</div>
                    </div>
                </div>
            </div>

            {overdueTickets.length > 0 && (
                <div className="section-container priority-section">
                    <div className="section-header">
                        <h3 className="section-title urgent">
                            <span className="section-icon">🚨</span>
                            Urgent - Overdue Tickets ({overdueTickets.length})
                        </h3>
                    </div>
                    <div className="ticket-list">
                        {overdueTickets.map(ticket => (
                            <TicketCard key={`overdue-${ticket._id}`} ticket={ticket} />
                        ))}
                    </div>
                </div>
            )}

            {openTickets.length > 0 && (
                <div className="section-container">
                    <div className="section-header">
                        <h3 className="section-title">
                            <span className="section-icon">🔧</span>
                            Active Tickets ({openTickets.length})
                        </h3>
                        <div className="section-badge">{openTickets.length} pending</div>
                    </div>
                    <div className="ticket-list">
                        {openTickets.map(ticket => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            )}

            {resolvedTickets.length > 0 && (
                <div className="section-container">
                    <div className="section-header">
                        <h3 className="section-title completed">
                            <span className="section-icon">✨</span>
                            Completed Tickets ({resolvedTickets.length})
                        </h3>
                        <div className="section-badge success">{resolvedTickets.length} resolved</div>
                    </div>
                    <div className="ticket-list">
                        {resolvedTickets.map(ticket => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            )}

            {openTickets.length === 0 && resolvedTickets.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🎯</div>
                    <h3>No maintenance tickets yet</h3>
                    <p>Get started by creating your first maintenance ticket to track your tasks efficiently.</p>
                    <Link to="/new" className="btn btn-primary btn-empty-state">
                        <span>Create Your First Ticket</span>
                        <div className="btn-icon">→</div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;