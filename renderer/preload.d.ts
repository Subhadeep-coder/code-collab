import { IpcHandler } from '../main/preload'
import { GetUserDetails, Login, Logout } from './types/auth-functions'

declare global {
  interface Window {
    context: {
      locale: string,
      register: Login,
      login: Login,
      logout: Logout,
      getDetails: GetUserDetails
    }
  }
}
