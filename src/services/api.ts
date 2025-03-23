import axios from 'axios';
import { UserDTO, User } from '../Interfaces/User';

// Create axios instance with base URL and default headers
const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests when available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// User API endpoints
export const userApi = {
    // Get current user profile and roles
    getCurrentUser: (userId: number) => api.get<User>(`/api/user/${userId}`),

    // Get user by Firebase UID
    getUserByUid: (uid: string) => api.get<User>(`/api/user/firebase/${uid}`),

    // Create user profile
    createUser: (user: UserDTO) => api.post<UserDTO>('/api/user', user),

    // Get all users
    getAllUsers: () => api.get<User[]>('/api/user/get-all'),

    // Update user 
    updateUser: (userId: number, user: Partial<User>) => api.put<User>(`/api/user/${userId}`, user),
};
