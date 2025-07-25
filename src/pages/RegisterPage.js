// client/src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <div className="form-logo">
                        <div className="logo-icon">✨</div>
                        <h2>Join Wekoleko</h2>
                        <p>Create your account to start managing maintenance tasks</p>
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <span className="label-icon">🔐</span>
                            Confirm Password
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm your password"
                                disabled={isLoading}
                            />
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                            <div className="password-mismatch">
                                <span>❌ Passwords don't match</span>
                            </div>
                        )}
                        {confirmPassword && password === confirmPassword && password.length > 0 && (
                            <div className="password-match">
                                <span>✅ Passwords match</span>
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-full-width"
                        disabled={isLoading || password !== confirmPassword}
                    >
                        {isLoading ? (
                            <>
                                <div className="loading-spinner-small"></div>
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <div className="btn-icon">✨</div>
                            </>
                        )}
                    </button>
                </form>

                <div className="form-footer">
                    <div className="divider">
                        <span>Already have an account?</span>
                    </div>
                    <p className="auth-switch">
                        Ready to sign in? 
                        <Link to="/login" className="auth-link">
                            Login here
                            <span className="link-arrow">→</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;