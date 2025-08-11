import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const menuRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Allow closing mobile menu when clicking OUTSIDE the menu, but not inside
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        function handleClick(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isMobileMenuOpen]);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" className="brand-link">
                        <div className="brand-icon">🔧</div>
                        <div className="brand-text">
                            <h1 className="brand-name">Wekoleko</h1>
                            <span className="brand-tagline">Maintenance Made Easy</span>
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
                
                {/* Sidebar/Menu */}
                <div 
                    className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                    ref={menuRef}
                    style={isMobileMenuOpen ? { pointerEvents: 'auto', position: 'fixed', zIndex: 1001 } : {}}
                >
                    <ul className="navbar-nav">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link 
                                        to="/dashboard" 
                                        className={`nav-link ${isActiveRoute('/dashboard') ? 'active' : ''}`}
                                    >
                                        <span className="nav-icon">📊</span>
                                        <span className="nav-text">Dashboard</span>
                                        <div className="nav-indicator"></div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        to="/new" 
                                        className={`nav-link ${isActiveRoute('/new') ? 'active' : ''}`}
                                    >
                                        <span className="nav-icon">➕</span>
                                        <span className="nav-text">New Ticket</span>
                                        <div className="nav-indicator"></div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        href="#!" 
                                        onClick={handleLogout} 
                                        className="nav-link logout-link"
                                    >
                                        <span className="nav-icon">🚪</span>
                                        <span className="nav-text">Logout</span>
                                        <div className="nav-indicator"></div>
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link 
                                        to="/register" 
                                        className={`nav-link ${isActiveRoute('/register') ? 'active' : ''}`}
                                    >
                                        <span className="nav-icon">✨</span>
                                        <span className="nav-text">Register</span>
                                        <div className="nav-indicator"></div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link 
                                        to="/login" 
                                        className={`nav-link login-cta ${isActiveRoute('/login') ? 'active' : ''}`}
                                    >
                                        <span className="nav-icon">🔑</span>
                                        <span className="nav-text">Login</span>
                                        <div className="nav-indicator"></div>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="mobile-menu-overlay"
                        style={{ pointerEvents: "auto", zIndex: 1000 }}
                        // No onClick here, handled by event listener above
                    ></div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;