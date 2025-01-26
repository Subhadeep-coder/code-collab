
export type FileNode = {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: FileNode[];
};

export type OpenFile = (filePath?: string) => Promise<{ success: boolean, content: string, filePath: string, fileName: string }>;
export type OpenFolder = () => Promise<{ success: boolean, rootFolderName: string, folderPath: string, folderStructure: FileNode[] }>;