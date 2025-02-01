import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow, electronAuthService } from "./helpers";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { GetUserDetails, Login, Logout } from "./types/auth-functions";
import dotenv from "dotenv";
import { electronFileService } from "./helpers/file-functions";
import { CreateFolder, OpenFile } from "./types/file-functions";
import { electronTerminalService } from "./helpers/terminal-functions";
import { CreateTerminal, GetTerminalLogs, KillTerminal, ResizeTerminal, RunCommand } from "./types/terminal-functions";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

app.whenReady().then(async () => {
  // Set app user model id for Windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Initialize the main window
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.maximize();

  if (isProd) {
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
  }

  // Authentication IPC handlers
  ipcMain.handle("user:register", (_, ...args: Parameters<Login>) =>
    electronAuthService.register(...args)
  );
  ipcMain.handle("user:login", (_, ...args: Parameters<Login>) =>
    electronAuthService.login(...args)
  );
  ipcMain.handle("user:logout", (_, ...args: Parameters<Logout>) =>
    electronAuthService.logout(...args)
  );
  ipcMain.handle("user:get-details", (_, ...args: Parameters<GetUserDetails>) =>
    electronAuthService.getCurrentUser(...args)
  );

  ipcMain.handle(
    "file:create",
    async (_, fileName: string, content: string) => {
      return electronFileService.createFile(mainWindow, fileName, content);
    }
  );
  ipcMain.handle("folder:create", async (_, ...args: Parameters<CreateFolder>) => {
    return electronFileService.createFolder(...args);
  });
  ipcMain.handle("file:open", async (_, ...args: Parameters<OpenFile>) => {
    return electronFileService.openFile(mainWindow, ...args);
  });
  ipcMain.handle("folder:open", async () => {
    return electronFileService.openFolder(mainWindow);
  });
  ipcMain.handle("run:command", async (_, ...args: Parameters<RunCommand>) => {
    return electronTerminalService.runCommand(...args);
  });
  ipcMain.handle("delete-folder", async (_, folderPath: string) => {
    return electronFileService.deleteFolder(mainWindow, folderPath);
  });

  ipcMain.handle('create:terminal', (_, ...args: Parameters<CreateTerminal>) => {
    return electronTerminalService.createTerminal(...args);
  });

  // Provide the complete log history for a terminal.
  ipcMain.handle('get:terminal:logs', async (_, ...args: Parameters<GetTerminalLogs>) => {
    return (await electronTerminalService.getTerminalLogs(...args));
  });

  // Send data from the renderer to the shell.
  ipcMain.on('run:command', (_, ...args: Parameters<RunCommand>) => {
    electronTerminalService.runCommand(...args);
  });

  // Resize the terminal as needed.
  ipcMain.on('resize:terminal', (_, ...args: Parameters<ResizeTerminal>) => {
    electronTerminalService.resizeTerminal(...args);
  });

  ipcMain.handle("kill:terminal", (_, ...args: Parameters<KillTerminal>) => {
    return electronTerminalService.killTerminal(...args);
  })

  // Reactivate app on macOS
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow("main", {
        width: 1000,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, "preload.js"),
        },
      });
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});