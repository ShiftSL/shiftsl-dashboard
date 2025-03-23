import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/user';

interface ProtectedRouteProps {
    requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
    const { currentUser, hasRole } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // If no specific role is required, just check if user is authenticated
    if (!requiredRole) {
        return <Outlet />;
    }

    // For ADMIN role, just check if user is admin
    if (requiredRole === UserRole.WARD_ADMIN && hasRole(UserRole.WARD_ADMIN)) {
        return <Outlet />;
    }

    // For ADMIN role, just check if user is admin
    if (requiredRole === UserRole.HR_ADMIN && hasRole(UserRole.HR_ADMIN)) {
        return <Outlet />;
    }

    if (requiredRole === UserRole.DOCTOR_PERM) {
        return <Outlet />;
    }

    // If none of the above conditions are met, redirect to unauthorized
    return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;