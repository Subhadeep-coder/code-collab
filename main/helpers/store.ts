import Store from 'electron-store';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { UserDetails } from '../types/auth-functions';
import { SupportedStorage } from '@supabase/supabase-js';


// Create a custom config path in user's home directory
const getConfigPath = () => {
    const appName = 'code-collab'; // Replace with your actual app name
    const configDir = path.join(os.homedir(), `.${appName}`);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    return configDir;
};

// Create store with custom path and defaults
export const userStore = new Store<UserDetails>({
    name: 'config', // Name of the config file
    cwd: getConfigPath(), // Set custom config directory
    defaults: {
        email: "",
        password: "",
        token: "",
        userId: "",
    },
    // Optional: Add encryption for sensitive data
    // Requires additional setup with encryption key
    // encryptionKey: 'your-encryption-key'
});

// Helper methods for user authentication
export const authStore = {
    // Store login information
    setLoginData: (loginData: Partial<UserDetails>) => {
        userStore.set(loginData);
    },

    // Get current login data
    getLoginData: (): UserDetails => {
        return userStore.store;
    },

    // Clear login data (logout)
    clearLoginData: () => {
        userStore.clear();
    },

    // Check if user is logged in
    isLoggedIn: () => {
        return !!userStore.get('token');
    }
};

export const supabaseStorage: SupportedStorage = {
    getItem: (key: string) => {
        return userStore.get(key);
    },
    setItem: (key: string, value: any) => {
        userStore.set(key, value);
    },
    removeItem: (key: keyof UserDetails) => {
        userStore.delete(key);
    }
}