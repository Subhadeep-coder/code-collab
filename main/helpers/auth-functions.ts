import path from 'path';
import dotenv from 'dotenv';
import { GetUserDetails, Login, Logout } from "../types/auth-functions";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { authStore, supabaseStorage } from './store';

class ElectronAuthService {
    private client: SupabaseClient;

    constructor() {
        // Initialize Supabase client
        dotenv.config({ path: path.resolve(__dirname, '../.env') });
        this.client = createClient(
            process.env.SUPABASE_URL || '',
            process.env.SUPABASE_ANON_KEY || '',
            {
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    storage: supabaseStorage
                }
            }
        );
    }

    // User Registration
    register: Login = async ({ email, password, name }) => {
        try {
            const { data: user, error } = await this.client.auth.signUp({
                email,
                password
            });

            if (error) throw error;

            if (user?.user) {

                const { error: profileError } = await this.client
                    .from('users')
                    .insert({
                        id: user.user.id,
                        email,
                        name,
                    });
                if (profileError) throw profileError;

                authStore.setLoginData({
                    email: user.user.email,
                    userId: user.user.id,
                    password: password,
                    token: user.session.access_token
                });
            }

            return {
                success: true,
                message: "User Registered successfully!",
                user: {
                    id: user.user.id,
                    name: name,
                    email: email,
                    token: user.session.access_token,
                }
            };
        } catch (error) {
            console.error('Registration Error:', error);
            throw error;
        }
    }

    // User Login
    login: Login = async ({ email, password }) => {
        try {

            const { data: session, error } = await this.client.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Fetch user details
            const user = session?.user;

            if (user) {

                const { data: userData, error: userError } = await this.client
                    .from('users')
                    .select('name')
                    .eq('id', user.id)
                    .maybeSingle();

                if (userError) {
                    console.error('Error fetching user details:', userError);
                    throw new Error('Unable to fetch user details from the database.');
                }

                if (!userData) {
                    console.warn('User not found in the database.');
                    throw new Error('User profile not found in the database.');
                }

                authStore.setLoginData({
                    email: user.email,
                    userId: user.id,
                    password: password,
                    token: session?.session?.access_token
                });

                return {
                    success: true,
                    message: "User Logged in successfully",
                    user: {
                        id: user.id,
                        name: userData.name,
                        email: email,
                        token: session.session.access_token,
                    }
                };
            }
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    };


    // Logout
    logout: Logout = async () => {
        try {

            const { error } = await this.client.auth.signOut();

            if (error) throw error;

            authStore.clearLoginData();

            return { success: true, message: 'Logout successful' };
        } catch (error) {
            console.error('Logout Error:', error);
            throw error;
        }
    }

    // Get Current User
    getCurrentUser: GetUserDetails = async () => {
        try {

            const storedToken = authStore.getLoginData()?.token;

            if (!storedToken) {
                console.warn('No token found. User is not logged in.');
                return null;
            }

            // Validate the token
            const { data: userData, error: userError } = await this.client.auth.getUser(storedToken);

            if (userError) {

                const { data: refreshData, error: refreshError } = await this.client.auth.refreshSession();

                if (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    authStore.clearLoginData();
                    return null;
                }

                const refreshedSession = refreshData?.session;
                if (refreshedSession) {
                    authStore.setLoginData({
                        email: refreshedSession.user.email,
                        userId: refreshedSession.user.id,
                        password: '',
                        token: refreshedSession.access_token
                    });
                } else {
                    console.warn('No session found after refresh.');
                    return null;
                }
            }

            const userId = userData?.user?.id || authStore.getLoginData()?.userId;
            if (!userId) {
                console.warn('User ID not found in token or local store.');
                return null;
            }

            const { data: dbUser, error: dbError } = await this.client
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (dbError) {
                console.error('Error fetching user from database:', dbError);
                return null;
            }

            return {
                isLoggedIn: true,
                userData: {
                    name: dbUser.name,
                    email: dbUser.email,
                    userId: dbUser.id,
                    token: storedToken
                }
            };
        } catch (error) {
            console.error('Get Current User Error:', error);
            return null;
        }
    };

    // Request Password Reset
    // async requestPasswordReset(email: string) {
    //     try {
    //         const { error } = await this.client.auth.resetPasswordForEmail(email, {
    //             redirectTo: `${process.env.APP_RESET_PASSWORD_URL || ''}/reset-password`
    //         });

    //         if (error) throw error;

    //         return { success: true, message: 'Password reset email sent' };
    //     } catch (error) {
    //         console.error('Password Reset Error:', error);
    //         throw error;
    //     }
    // }

    // Update User Profile
    updateUserProfile = async (userId: string, updates: Record<string, any>) => {
        try {
            const { error } = await this.client
                .from('users')
                .update(updates)
                .eq('id', userId);

            if (error) throw error;

            return { success: true, message: 'Profile updated successfully' };
        } catch (error) {
            console.error('Update Profile Error:', error);
            throw error;
        }
    }
}

export const electronAuthService = new ElectronAuthService();
