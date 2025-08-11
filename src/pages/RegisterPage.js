// client/src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUserCircle, FaLock, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setIsError(false);

        if (password !== confirmPassword) {
            setMessage('Passwords do not match. Please check and try again.');
            setIsError(true);
            setIsLoading(false);
            return;
        }

        const result = await register(email, password);
        setMessage(result.message);
        setIsError(!result.success);
        setIsLoading(false);
    };

    const getPasswordStrength = (password) => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 25, label: 'Weak', color: '#ef4444' };
        if (password.length < 8) return { strength: 50, label: 'Fair', color: '#f59e0b' };
        if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return { strength: 100, label: 'Strong', color: '#10b981' };
        }
        return { strength: 75, label: 'Good', color: '#3b82f6' };
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <FaUserPlus className="auth-icon" />
                    <h2 className="auth-title">Join Wekoleko</h2>
                    <p className="auth-subtitle">Create your account to start managing maintenance tasks</p>
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
                                placeholder="Create a strong password"
                                disabled={isLoading}
                            />
                        </div>
                        {password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div 
                                        className="strength-fill"
                                        style={{ 
                                            width: `${passwordStrength.strength}%`,
                                            backgroundColor: passwordStrength.color
                                        }}
                                    ></div>
                                </div>
                                <span 
                                    className="strength-label"
                                    style={{ color: passwordStrength.color }}
                                >
                                    {passwordStrength.label}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-group-modern">
                        <label htmlFor="confirmPassword" className="form-label-modern">
                            Confirm Password
                        </label>
                        <div className="input-container">
                            <FaLock className="input-icon-modern" />
                            <input
                                type="password"
                                id="confirmPassword"
                                className="input-modern"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                                disabled={isLoading}
                            />
                        </div>
                        {confirmPassword && password.length > 0 && (
                            <div className={`password-match-indicator ${password === confirmPassword ? 'match' : 'mismatch'}`}>
                                {password === confirmPassword ? <FaCheck /> : <FaTimes />}
                                <span>{password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}</span>
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="nav-btn primary auth-btn"
                        disabled={isLoading || password !== confirmPassword}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="spin-icon" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <FaUserPlus className="btn-icon" />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-switch">
                        Already have an account? 
                        <Link to="/login" className="auth-link-modern">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;