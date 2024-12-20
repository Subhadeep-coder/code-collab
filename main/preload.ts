import { contextBridge, ipcRenderer } from "electron";
import { GetUserDetails, Login, Logout } from "./types/auth-functions";

if (!process.contextIsolated) {
  throw new Error(`contextIsolation must be enabled in the BrowserWindow`);
}


try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    register: (...args: Parameters<Login>) => ipcRenderer.invoke("user:register", ...args),
    login: (...args: Parameters<Login>) => ipcRenderer.invoke("user:login", ...args),
    logout: (...args: Parameters<Logout>) => ipcRenderer.invoke("user:logout", ...args),
    getDetails: (...args: Parameters<GetUserDetails>) => ipcRenderer.invoke("user:get-details", ...args),
  })
} catch (error) {
  console.log(error);
}