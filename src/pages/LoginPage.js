// client/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaLock, FaSignInAlt, FaSpinner } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);
        
        const result = await login(email, password);
        setMessage(result.message);
        setIsError(!result.success);
        setIsLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <FaUserCircle className="auth-icon" />
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your Wekoleko account</p>
                </div>

                {message && (
                    <div className={`message-card ${isError ? 'error' : 'success'}`}>
                        <div className="message-icon">{isError ? '❌' : '✅'}</div>
                        <span>{message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group-modern">
                        <label htmlFor="email" className="form-label-modern">
                            Email Address
                        </label>
                        <div className="input-container">
                            <FaUserCircle className="input-icon-modern" />
                            <input
                                type="email"
                                id="email"
                                className="input-modern"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your.email@example.com"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-group-modern">
                        <label htmlFor="password" className="form-label-modern">
                            Password
                        </label>
                        <div className="input-container">
                            <FaLock className="input-icon-modern" />
                            <input
                                type="password"
                                id="password"
                                className="input-modern"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="nav-btn primary auth-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="spin-icon" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <FaSignInAlt className="btn-icon" />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-switch">
                        Don't have an account? 
                        <Link to="/register" className="auth-link-modern">
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;