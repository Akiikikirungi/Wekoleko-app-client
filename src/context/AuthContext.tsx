// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Our configured Axios instance

// Types
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Effect to sync state with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const res = await API.post('/auth/login', { email, password });
      
      const { token: authToken, user: userData } = res.data;
      
      // Store in localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Navigate to dashboard
      navigate('/dashboard');
      
      return { 
        success: true, 
        message: res.data.msg || 'Login successful!',
        token: authToken,
        user: userData
      };
    } catch (err: any) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      
      const errorMessage = err.response?.data?.msg 
        || err.response?.data?.message 
        || 'Login failed. Please check your credentials.';
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const res = await API.post('/auth/register', { 
        name, 
        email, 
        password 
      });
      
      const { token: authToken, user: userData } = res.data;
      
      // Store in localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update state
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Navigate to dashboard
      navigate('/dashboard');
      
      return { 
        success: true, 
        message: res.data.msg || 'Registration successful!',
        token: authToken,
        user: userData
      };
    } catch (err: any) {
      console.error('Register error:', err.response ? err.response.data : err.message);
      
      const errorMessage = err.response?.data?.msg 
        || err.response?.data?.message 
        || 'Registration failed. Please try again.';
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('rememberedEmail');
    
    // Clear state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // Navigate to login
    navigate('/login');
  };

  // Update user function (for profile updates)
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;