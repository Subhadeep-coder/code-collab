export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

export class AuthService {
    // Create a new account
    async register(email: string, password: string, name: string) {
        try {
            const res = await window.context.register({ email, password, name });
            return res.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Login
    async login(email: string, password: string) {
        try {
            const res = await window.context.login({ email, password });
            return res.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Logout
    async logout(): Promise<void> {
        try {
            await window.context.logout();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser(): Promise<any> {
        try {
            const user = await window.context.getDetails();
            return user.userData;
        } catch (error) {
            return null;
        }
    }

    // Password reset
    // async requestPasswordReset(email: string): Promise<void> {
    //     try {
    //         await account.createRecovery(
    //             email,
    //             `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
    //         );
    //     } catch (error) {
    //         console.error('Password reset request error:', error);
    //         throw error;
    //     }
    // }
}

export const authService = new AuthService();