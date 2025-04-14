import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const AuthService = {
  // Register a new user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/users', userData);
    
    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data._id,
        name: response.data.name,
        email: response.data.email
      }));
    }
    
    return response.data;
  },
  
  // Login user
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/users/login', credentials);
    
    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data._id,
        name: response.data.name,
        email: response.data.email
      }));
    }
    
    return response.data;
  },
  
  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('token');
  }
};

export default AuthService; 