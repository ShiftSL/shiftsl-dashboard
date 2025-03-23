import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../Interfaces/User';

interface ProtectedRouteProps {
    requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // If no specific role is required, just check if the user is authenticated
    if (!requiredRole) {
        return <Outlet />;
    }

    // Check if the user's role matches the required role
    if (currentUser.role === requiredRole) {
        return <Outlet />;
    }

    // If the user's role doesn't match the required role, redirect to unauthorized
    return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
