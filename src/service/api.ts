import axios from 'axios';
import { User, UserDTO } from '../types/user';
import {Shift, shiftDTO} from "../types/shift.ts";
import {LeaveRequest} from "../Interfaces/LeaveRequest.tsx";
import {leave} from "../types/leave.ts";

// Create axios instance with base URL and default headers
const api = axios.create({
    baseURL: "https://kings.backend.shiftsl.com",
    headers: {
        'Content-Type': 'application/json'
    }
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
    // Get current user profile and role
    getUser: (id: number) => api.get<User>(`/api/user/${id}`),

    // Get user by Firebase UID
    getUserByUid: (uid: string) => api.get<User>(`/api/user/firebase/${uid}`),

    // Create or update user profile
    saveUser: (user: UserDTO) => api.post<User>('/api/user', user),

    // Get all users (admin only)
    getAllUsers: () => api.get<User[]>('/api/user/get-all')
};
export const shiftApi = {
    // Create a New shift
    createShift: (wardID: number, shift:shiftDTO) => api.post<Shift>(`/api/shift/create/${wardID}`, shift),

    // Get All Shifts
   getAllShifts: () => api.get(`/api/shift`),

    // Delete All Shifts
    deleteShift: (shiftId: number) => api.delete(`/api/shift/${shiftId}`),

    // Update Shifts
    updateShift: (shift: Shift)=> api.put<Shift>(`/api/shift/` , shift)
};
export const leaveApi={
    getAllLeaves:() => api.get<leave>(`/api/leave`),
}