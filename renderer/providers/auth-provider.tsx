"use client";

import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode
} from 'react';
import { authService, User } from '../lib/auth-service';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<string>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<string>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => "",
    logout: async () => { },
    register: async () => "",
    isLoading: true
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const loggedInUser = await authService.login(email, password);
            setUser(loggedInUser);
            return loggedInUser.token;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        try {
            const registeredUser = await authService.register(email, password, name);
            setUser(registeredUser);
            return registeredUser.token;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            register,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);