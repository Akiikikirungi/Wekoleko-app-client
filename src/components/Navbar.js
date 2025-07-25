// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <div className="brand-icon">🔧</div>
                    <h1>Wekoleko</h1>
                </Link>
            </div>
            
            <div className="navbar-menu">
                <ul className="navbar-nav">
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    <span className="nav-icon">📊</span>
                                    <span className="nav-text">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/new" className="nav-link">
                                    <span className="nav-icon">➕</span>
                                    <span className="nav-text">New Ticket</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="#!" onClick={handleLogout} className="nav-link logout-link">
                                    <span className="nav-icon">🚪</span>
                                    <span className="nav-text">Logout</span>
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    <span className="nav-icon">✨</span>
                                    <span className="nav-text">Register</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link login-cta">
                                    <span className="nav-icon">🔑</span>
                                    <span className="nav-text">Login</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;