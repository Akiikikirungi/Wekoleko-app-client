// client/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <div className="form-logo">
                        <div className="logo-icon">🔧</div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to your Wekoleko account</p>
                    </div>
                </div>

                {message && (
                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                        <strong>{isError ? 'Error:' : 'Success:'}</strong> {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">
                            <span className="label-icon">📧</span>
                            Email Address
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email address"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <span className="label-icon">🔒</span>
                            Password
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-full-width"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="loading-spinner-small"></div>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <div className="btn-icon">→</div>
                            </>
                        )}
                    </button>
                </form>

                <div className="form-footer">
                    <div className="divider">
                        <span>New to Wekoleko?</span>
                    </div>
                    <p className="auth-switch">
                        Don't have an account? 
                        <Link to="/register" className="auth-link">
                            Create one here
                            <span className="link-arrow">→</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;