import { OpenFile, OpenFolder } from 'types/file-functions'
import { IpcHandler } from '../main/preload'
import { GetUserDetails, Login, Logout } from './types/auth-functions'
import { RunCommand } from 'types/terminal-functions'

declare global {
  interface Window {
    context: {
      locale: string,
      register: Login,
      login: Login,
      logout: Logout,
      getDetails: GetUserDetails
      createFolder: Function,
      createFile: Function,
      deleteFolder: Function,
      openFile: OpenFile,
      openFolder: OpenFolder,
      runCommand: RunCommand,
      getCommandOutput: (cb: (event: Electron.IpcRendererEvent, data: any) => void) => void,
      removeCommandOutputListeners: () => void,
      getProcessDone: (cb: (event: Electron.IpcRendererEvent, data: any) => void) => void,
    }
  }
}
