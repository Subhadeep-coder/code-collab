import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow, electronAuthService } from './helpers'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { GetUserDetails, Login, Logout } from './types/auth-functions'
import dotenv from 'dotenv';



const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // ipcMain.handle("get:notes", (_, ...args: Parameters<GetNotes>) => getNotes(...args));
  ipcMain.handle("user:register", (_, ...args: Parameters<Login>) => electronAuthService.register(...args));
  ipcMain.handle("user:login", (_, ...args: Parameters<Login>) => electronAuthService.login(...args));
  ipcMain.handle("user:logout", (_, ...args: Parameters<Logout>) => electronAuthService.logout(...args));
  ipcMain.handle("user:get-details", (_, ...args: Parameters<GetUserDetails>) => electronAuthService.getCurrentUser(...args));

  // IPC test
  // ipcMain.on('ping', () => console.log('pong'))

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    // show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  mainWindow.maximize();
  if (isProd) {
    await mainWindow.loadURL('app://./')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}`)
    // mainWindow.webContents.openDevTools()
  }




  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow('main', {
      width: 1000,
      height: 600,
      // show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })
  })
})


app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
