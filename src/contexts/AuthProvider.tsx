import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../types/User';
import { getUser, loginUser, logoutUser, signupUser } from '../api/moviesAuthenticated';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        console.log('>>> fetchUser1: ', );
        try {
            const result = await getUser();
            console.log('>>> fetchUser2: ', result.data);
            setUser(result.data);
        } catch (error) {
            console.error("Failed to fetch current user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    async function signup(email: string, password: string) {
        try {
            const result = await signupUser(email, password);
            setUser(result.data);
        } catch (error) {
            console.error("Failed to sign up user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(email: string, password: string) {
        try {
            const result = await loginUser(email, password);
            setUser(result.data);
        } catch (error) {
            console.error("Failed to log in user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error("Failed to log out user:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, 
                                        loading, 
                                        refreshUser: fetchUser, 
                                        signup: signup,
                                        login: login,
                                        logout: logout 
                                    }}>
            {children}
        </AuthContext.Provider>
    );
};
