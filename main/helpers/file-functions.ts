import { app, BrowserWindow, dialog } from 'electron';
import * as fs from 'fs';
import path from 'path';
import { FileNode } from '../types/file-functions';

class FileService {
    async createFile(window: BrowserWindow, fileName: string, content: string) {
        try {
            // Open dialog to select the save location
            const { canceled, filePath } = await dialog.showSaveDialog(window, {
                title: 'Save File',
                defaultPath: path.join(app.getPath('documents'), fileName),
                filters: [
                    { name: 'Text Files', extensions: ['txt'] },
                    { name: 'All Files', extensions: ['*'] },
                ],
            });

            if (canceled || !filePath) {
                return { success: false, message: 'File creation canceled by the user.' };
            }

            // Write content to the selected file location
            fs.writeFileSync(filePath, content, { encoding: 'utf8' });

            return {
                success: true,
                message: `File created successfully at ${filePath}`,
                filePath,
            };
        } catch (error) {
            console.error('Error creating file:', error);
            return { success: false, message: 'Error creating file.' };
        }
    }

    async openFile(window: BrowserWindow) {
        try {
            const { canceled, filePaths } = await dialog.showOpenDialog(window, {
                properties: ['openFile'],
                filters: [{ name: 'All Files', extensions: ['*'] }],
            });

            if (canceled || filePaths.length === 0) {
                return { success: false, message: 'No file selected.' };
            }

            const filePath = filePaths[0];
            const content = fs.readFileSync(filePath, { encoding: 'utf8' });
            console.log(content);
            console.log(filePath);
            return { success: true, content, filePath };
        } catch (error) {
            console.error('Error opening file:', error);
            return { success: false, message: 'Error opening file.' };
        }
    }

    async openFolder(window: BrowserWindow) {
        try {
            const { canceled, filePaths } = await dialog.showOpenDialog(window, {
                properties: ['openDirectory'],
            });

            if (canceled || filePaths.length === 0) {
                return { success: false, message: 'No folder selected.' };
            }

            const folderPath = filePaths[0];

            // Generate folder structure recursively
            const folderStructure = this.readFolderRecursive(folderPath);

            return { success: true, folderPath, folderStructure };
        } catch (error) {
            console.error('Error opening folder:', error);
            return { success: false, message: 'Error opening folder.' };
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