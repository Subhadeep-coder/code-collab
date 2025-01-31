import { app, BrowserWindow, dialog } from "electron";
import * as fs from "fs";
import path from "path";
import { FileNode } from "../types/file-functions";
class FileService {
  // Add this property to track the current folder path
  private _currentPath: string | null = null;
  async createFile(window: BrowserWindow, fileName: string, content: string) {
    try {
      // Open dialog to select the save location
      const { canceled, filePath } = await dialog.showSaveDialog(window, {
        title: "Save File",
        defaultPath: path.join(app.getPath("documents"), fileName),
        filters: [
          { name: "Text Files", extensions: ["txt"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });

      if (canceled || !filePath) {
        return {
          success: false,
          message: "File creation canceled by the user.",
        };
      }

      // Write content to the selected file location
      fs.writeFileSync(filePath, content, { encoding: "utf8" });

      return {
        success: true,
        message: `File created successfully at ${filePath}`,
        filePath,
      };
    } catch (error) {
      console.error("Error creating file:", error);
      return { success: false, message: "Error creating file." };
    }
  }

  async deleteFolder(window: BrowserWindow, folderPath: string) {
    try {
      // Confirm if folder exists
      if (!fs.existsSync(folderPath)) {
        return {
          success: false,
          message: "The selected folder does not exist.",
        };
      }

      // Check if folder is within current working directory
      if (!folderPath.startsWith(this._currentPath!)) {
        return {
          success: false,
          message:
            "Cannot delete folders outside the current working directory.",
        };
      }

      // Show confirmation dialog
      const { response } = await dialog.showMessageBox(window, {
        type: "warning",
        buttons: ["Cancel", "Delete"],
        defaultId: 0,
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this folder?",
        detail: `This will permanently delete the folder and all its contents at:\n${folderPath}`,
      });

      // If user didn't confirm (clicked Cancel or closed dialog)
      if (response !== 1) {
        return {
          success: false,
          message: "Folder deletion cancelled by user.",
        };
      }

      // Delete the folder recursively
      await fs.promises.rm(folderPath, { recursive: true, force: true });

      // Generate updated folder structure
      const folderStructure = this.readFolderRecursive(this._currentPath!);

      return {
        success: true,
        message: "Folder deleted successfully.",
        folderStructure,
      };
    } catch (error) {
      console.error("Error deleting folder:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? `Error deleting folder: ${error.message}`
            : "Error deleting folder.",
      };
    }
  }

  async createFolder(folderName: string) {
    try {
      // Get the currently selected folder path from the file service
      const currentPath = this._currentPath; // You'll need to add this property

      if (!currentPath) {
        return {
          success: false,
          message: "No folder is currently opened. Please open a folder first.",
        };
      }

      const newFolderPath = path.join(currentPath, folderName);

      // Check if folder already exists
      if (fs.existsSync(newFolderPath)) {
        return {
          success: false,
          message:
            "A folder with this name already exists in the selected location.",
        };
      }

      // Create the new folder
      fs.mkdirSync(newFolderPath);

      // Generate updated folder structure
      const folderStructure = this.readFolderRecursive(currentPath);

      return {
        success: true,
        message: `Folder created successfully at ${newFolderPath}`,
        folderPath: newFolderPath,
        parentPath: currentPath,
        folderStructure,
      };
    } catch (error) {
      console.error("Error creating folder:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Error creating folder.",
      };
    }
  }

  async openFile(window: BrowserWindow, filepath?: string) {
    try {
      let filePath: string;

      if (filepath) {
        filePath = filepath;
      } else {
        const { canceled, filePaths } = await dialog.showOpenDialog(window, {
          properties: ["openFile"],
          filters: [{ name: "All Files", extensions: ["*"] }],
        });

        if (canceled || filePaths.length === 0) {
          return { success: false, message: "No file selected." };
        }

        filePath = filePaths[0];
      }

      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      const fileName = path.basename(filePath);

      return { success: true, content, filePath, fileName };
    } catch (error) {
      console.error("Error opening file:", error);
      return { success: false, message: "Error opening file." };
    }
  }

  async openFolder(window: BrowserWindow) {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog(window, {
        properties: ["openDirectory"],
      });

      if (canceled || filePaths.length === 0) {
        return { success: false, message: "No folder selected." };
      }

      const folderPath = filePaths[0];
      this._currentPath = folderPath; // Set the current path
      const rootFolderName = path.basename(folderPath);

      // Generate folder structure recursively
      const folderStructure = this.readFolderRecursive(folderPath);

      return {
        success: true,
        rootFolderName,
        folderPath,
        folderStructure,
      };
    } catch (error) {
      console.error("Error opening folder:", error);
      return { success: false, message: "Error opening folder." };
    }
  }

  private readFolderRecursive(folderPath: string): FileNode[] {
    const entries = fs.readdirSync(folderPath, { withFileTypes: true });

    return entries.map((entry) => {
      const fullPath = path.join(folderPath, entry.name);
      const isDirectory = entry.isDirectory();

      const node: FileNode = {
        name: entry.name,
        path: fullPath,
        isDirectory,
      };

      // If it's a directory, recursively read its contents
      if (isDirectory) {
        node.children = this.readFolderRecursive(fullPath);
      }

      return node;
    });
  }
}

export const electronFileService = new FileService();