import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import axios from 'axios';

export default function useLoginSignup() {
    const { signup, login, logout } = useAuth();
    const [error, setError] = useState<string>('');

    function clearError() {
        setError('');
    }

    async function startLogin(email: string, password: string): Promise<boolean> {
        clearError();

        try {
            await login(email, password)
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    async function startSignup(email: string, password: string, passwordRepeat: string): Promise<boolean> {
        clearError();

        if (password !== passwordRepeat) {
            handleError("Passwords didn't match");
            return true;
        }

        try {
            await signup(email, password);
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    async function startLogout(): Promise<boolean> {
        clearError();
        
        try {
            await logout();
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    function handleError(error: unknown) {
        if (typeof error === 'string') {
            setError(error);
        } else if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                setError(error.response.data.error);
            } else if (error.response?.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('Something went wrong, please try again');
            }
        } else {
            console.error('Unexpected error:', error);
            setError("Something went wrong, please try again");
        }
    }

    return { error, clearError, startLogout, startLogin, startSignup };
}
