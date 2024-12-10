// Define the type for user details
export type UserDetails = {
    name?: string;
    email: string;
    password: string;
    token?: string;
    userId?: string;
};

export type Login = (loginData: UserDetails) => Promise<{ success: boolean, message: string, user: any }>;
export type Logout = () => Promise<{ success: boolean, message: string }>;
export type GetUserDetails = () => Promise<{ isLoggedIn: boolean, userData: Omit<UserDetails, "password"> }>;