// src/api/index.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api', // Changed = to :
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add a request interceptor to attach token to all requests
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If data is FormData, remove Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData && config.headers) {
      delete config.headers['Content-Type'];
    }
    
    // Log request for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data instanceof FormData ? 'FormData' : config.data,
      });
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
API.interceptors.response.use(
  (response) => {
    // Log response for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      const status = error.response.status;
      
      // Unauthorized - token expired or invalid
      if (status === 401) {
        console.warn('Unauthorized access - clearing auth data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      // Forbidden
      if (status === 403) {
        console.error('Forbidden - insufficient permissions');
      }
      
      // Server error
      if (status >= 500) {
        console.error('Server error - please try again later');
      }
      
      // Log error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', {
          status: error.response.status,
          data: error.response.data,
          url: error.config?.url,
        });
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - no response received');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default API;

// Optional: Export specific API methods for common operations
export const authAPI = {
  login: (email: string, password: string) => 
    API.post('/auth/login', { email, password }),
    
  register: (name: string, email: string, password: string) => 
    API.post('/auth/register', { name, email, password }),
    
  forgotPassword: (email: string) => 
    API.post('/auth/forgot-password', { email }),
    
  resetPassword: (token: string, password: string) => 
    API.post('/auth/reset-password', { token, password }),
};

export const userAPI = {
  getProfile: () => 
    API.get('/users/profile'),
    
  updateProfile: (data: any) => 
    API.put('/users/profile', data),
    
  changePassword: (oldPassword: string, newPassword: string) => 
    API.post('/users/change-password', { oldPassword, newPassword }),
};

export const ticketAPI = {
  getAll: () => 
    API.get('/tickets'),
    
  getById: (id: string) => 
    API.get(`/tickets/${id}`),
    
  create: (data: FormData | any) => 
    API.post('/tickets', data),
    
  update: (id: string, data: FormData | any) => 
    API.put(`/tickets/${id}`, data),
    
  delete: (id: string) => 
    API.delete(`/tickets/${id}`),
};