'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { roles } from '../constansts';
import { LoginResponseType } from '../schemas/login-response-schema';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    userId: string | null;
    role: string | null;
    login: (response: LoginResponseType) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserRole = localStorage.getItem('userRole');
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');

        if (storedToken && storedUserRole && storedUserId) {
            setToken(storedToken);
            setRole(roles[storedUserRole]);
            setUserId(storedUserId);
        }
        setIsLoading(false); // La inicialización ha terminado
    }, []);

    const login = (response: LoginResponseType) => {
        const token = response.token;
        setToken(token);
        localStorage.setItem('token', token);

        const userRole = response.data.Rol.id_rol;
        setRole(roles[userRole]);
        localStorage.setItem('userRole', userRole.toString());

        const userId = response.data.id_usuario.toString();
        setUserId(userId);
        localStorage.setItem('userId', userId);
    };



    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');

        setRole(null);
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                logout,
                role,
                userId
            }}
        >
            {children}
        </AuthContext.Provider >
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};