
export type FileNode = {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: FileNode[];
};

export type OpenFile = () => Promise<{ success: boolean, content: string, filePath: string }>;
export type OpenFolder = () => Promise<{ success: boolean, folderPath: string, folderStructure: FileNode[] }>;