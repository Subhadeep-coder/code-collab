import { OpenFile, OpenFolder } from 'types/file-functions'
import { IpcHandler } from '../main/preload'
import { GetUserDetails, Login, Logout } from './types/auth-functions'
import { CreateTerminal, GetCommandOutput, GetTerminalLogs, KillTerminal, ResizeTerminal, RunCommand } from 'types/terminal-functions'

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
      createTerminal: CreateTerminal,
      getTerminalLogs: GetTerminalLogs,
      runCommand: RunCommand,
      resizeTerminal: ResizeTerminal,
      getCommandOutput: (cb: GetCommandOutput) => void,
      removeListner: (cb: GetCommandOutput) => void,
      killTerminal: KillTerminal,
    }
  }
}
