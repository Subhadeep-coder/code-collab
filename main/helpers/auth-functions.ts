import { GetUserDetails, Login, Logout, UserDetails } from "../types/auth-functions";
import { authStore } from "./store";

export const login: Login = (loginData: Partial<UserDetails>) => {
    try {
        console.log('Login data stores');
        // Store the login data
        authStore.setLoginData(loginData);
        return { success: true, message: 'Login successful' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const logout: Logout = () => {
    try {
        console.log('Logout user');
        authStore.clearLoginData();
        return { success: true, message: 'Logout successful' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const getLoginStatus: GetUserDetails = () => {
    console.log('Get user data');
    return {
        isLoggedIn: authStore.isLoggedIn(),
        userData: authStore.getLoginData()
    };
}