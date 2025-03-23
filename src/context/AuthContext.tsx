import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    getIdToken
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { User, UserRole } from '../types/user';
import { userApi } from '../service/api';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user from backend or create if not exists
    const syncUserWithBackend = async (firebaseUser: FirebaseUser): Promise<User> => {
        try {
            // Get token for backend authentication
            const token = await getIdToken(firebaseUser);
            localStorage.setItem('authToken', token);

            // Try to get existing user
            const { data: user } = await userApi.getUserByUid(firebaseUser.uid);
            return user;

        } catch (error) {
            console.error("Error syncing user with backend:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    const user = await syncUserWithBackend(firebaseUser);
                    setCurrentUser(user);
                } else {
                    localStorage.removeItem('authToken');
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Auth state change error:", error);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem('authToken');
    };

    const hasRole = (role: UserRole): boolean => {
        if (!currentUser) return false;
        return currentUser.role === role;
    };

    const value = {
        currentUser,
        loading,
        login,
        logout,
        hasRole
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};