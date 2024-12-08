// Define the type for user details
export type UserDetails = {
    email: string;
    password?: string;
    token: string;
    userId?: string;
};

export type Login = (loginData: UserDetails) => { success: boolean, message: string };
export type Logout = () => { success: boolean, message: string };
export type GetUserDetails = () => { isLoggedIn: boolean, userData: UserDetails };