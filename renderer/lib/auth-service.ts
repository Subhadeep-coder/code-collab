import { ID } from 'appwrite';
import { account } from '../utils/appwrite-config';

export interface User {
    $id: string;
    name: string;
    email: string;
    token: string;
}

export class AuthService {
    // Create a new account
    async register(email: string, password: string, name: string): Promise<User> {
        try {
            const response = await account.create(ID.unique(), email, password, name);
            const session = await account.createEmailPasswordSession(email, password);
            return { ...response, token: session.providerAccessToken } as User;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Login
    async login(email: string, password: string): Promise<User> {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            const user = await account.get();
            return { ...user, token: session.providerAccessToken } as User;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Logout
    async logout(): Promise<void> {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser(): Promise<User | null> {
        try {
            const user = await account.get();
            const session = await account.getSession("current");
            return { ...user, token: session.providerAccessToken };
        } catch (error) {
            return null;
        }
    }

    // Password reset
    async requestPasswordReset(email: string): Promise<void> {
        try {
            await account.createRecovery(
                email,
                `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
            );
        } catch (error) {
            console.error('Password reset request error:', error);
            throw error;
        }
    }
}

export const authService = new AuthService();