import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { User } from '../Interfaces/User';
import { userApi } from '../services/api';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
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

    // Sync Firebase user with the backend
    const syncUserWithBackend = async (firebaseUser: FirebaseUser): Promise<User> => {
        try {
            // Get Firebase token
            const token = await firebaseUser.getIdToken();
            localStorage.setItem('authToken', token);

            // Try fetching the user from backend
            const { data: user } = await userApi.getUserByUid(firebaseUser.uid);
            return user;
        } catch (error) {
            console.error("Error fetching user from backend:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
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
        setCurrentUser(null);
    };


    const value = {
        currentUser,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
