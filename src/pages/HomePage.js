// client/src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="container home-page">
            <div className="home-hero">
                <h1>Welcome to Wekoleko</h1>
                <div className="hero-subtitle">
                    <p>Your intelligent maintenance companion for seamless task management and field operations.</p>
                </div>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔧</div>
                        <h3>Smart Tracking</h3>
                        <p>Organize and track maintenance tasks with intelligent categorization</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Mobile Ready</h3>
                        <p>Perfect for field work with responsive design and offline capabilities</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Progress Insights</h3>
                        <p>Visual analytics to monitor your maintenance workflow efficiency</p>
                    </div>
                </div>

                <div className="cta-section">
                    {isAuthenticated ? (
                        <div className="authenticated-actions">
                            <Link to="/dashboard" className="btn btn-primary btn-hero">
                                <span>Go to Dashboard</span>
                                <div className="btn-icon">→</div>
                            </Link>
                            <div className="quick-stats">
                                <p>Welcome back! Ready to manage your maintenance tasks?</p>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-actions">
                            <Link to="/login" className="btn btn-primary btn-hero">
                                <span>Get Started</span>
                                <div className="btn-icon">→</div>
                            </Link>
                            <Link to="/register" className="btn btn-secondary btn-hero">
                                <span>Create Account</span>
                                <div className="btn-icon">+</div>
                            </Link>
                            <div className="auth-hint">
                                <p>Join thousands of maintenance professionals using Wekoleko</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;