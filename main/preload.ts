import { contextBridge, ipcRenderer } from "electron";
import { GetUserDetails, Login, Logout } from "./types/auth-functions";
import { OpenFile } from "./types/file-functions";
import { RunCommand } from "./types/terminal-functions";

if (!process.contextIsolated) {
  throw new Error(`contextIsolation must be enabled in the BrowserWindow`);
}

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    register: (...args: Parameters<Login>) =>
      ipcRenderer.invoke("user:register", ...args),
    login: (...args: Parameters<Login>) =>
      ipcRenderer.invoke("user:login", ...args),
    logout: (...args: Parameters<Logout>) =>
      ipcRenderer.invoke("user:logout", ...args),
    getDetails: (...args: Parameters<GetUserDetails>) =>
      ipcRenderer.invoke("user:get-details", ...args),
    createFile: (...args: any) => ipcRenderer.invoke("file:create", ...args),
    openFile: (...args: Parameters<OpenFile>) => ipcRenderer.invoke("file:open", ...args),
    openFolder: (...args: any) => ipcRenderer.invoke("folder:open", ...args),
    runCommand: (...args: Parameters<RunCommand>) => ipcRenderer.invoke("run:command", ...args),
    getCommandOutput: (cb: (event: Electron.IpcRendererEvent, data: any) => void) => ipcRenderer.on("command:output", cb),
    removeCommandOutputListeners: () => ipcRenderer.removeAllListeners("command:output"),
    getProcessDone: (cb: (event: Electron.IpcRendererEvent, data: any) => void) => ipcRenderer.once("process:done", cb),
  });
} catch (error) {
  console.log(error);
}