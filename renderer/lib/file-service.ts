export class FileService {
    async openFile(filePath?: string) {
        try {
            const result = await window.context.openFile(filePath);
            return result;
        } catch (error) {
            console.log('File open error: ', error);
            throw error;
        }
    }

    async openFolder() {
        try {
            const result = await window.context.openFolder();
            return result;
        } catch (error) {
            console.log('Open folder: ', error);
            throw error;
        }
    }

    async deleteFolder(folderPath: string) {
        try {
            const result = await window.context.deleteFolder(folderPath);
            return result;
        } catch (error) {
            console.log('Delete folder:', error);
            throw error;
        }
    }

    async createFolder(folderName: string) {
        try {
            const result = await window.context.createFolder(folderName);
            return result;
        } catch (error) {
            console.log('Error while creating the folder: ', folderName);
            throw error;
        }
    }
}

export const fileService = new FileService();