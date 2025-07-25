// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Our configured Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Store user info (e.g., email, id)
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    // Effect to update authentication status when token changes in localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(!!storedToken);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); // Store basic user data
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            navigate('/dashboard'); // Redirect to dashboard on successful login
            return { success: true, message: res.data.msg };
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            return { success: false, message: err.response?.data?.msg || 'Login failed' };
        }
    };

    const register = async (email, password) => {
        try {
            const res = await API.post('/auth/register', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setToken(res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            navigate('/dashboard'); // Redirect to dashboard on successful registration
            return { success: true, message: res.data.msg };
        } catch (err) {
            console.error('Register error:', err.response ? err.response.data : err.message);
            return { success: false, message: err.response?.data?.msg || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page on logout
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);