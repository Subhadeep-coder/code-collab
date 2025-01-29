export type FileNode = {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileNode[];
};

export type OpenFile = (filePath?: string) => Promise<{
  success: boolean;
  content: string;
  filePath: string;
  fileName: string;
}>;
export type OpenFolder = () => Promise<{
  success: boolean;
  rootFolderName: string;
  folderPath: string;
  folderStructure: FileNode[];
}>;
export type DeleteFolder = (folderPath: string) => Promise<{
  success: boolean;
  message: string;
  folderStructure?: FileNode[];
}>;
export type FileSystemAPI = {
  createFolder: (folderName: string) => Promise<{
    success: boolean;
    message: string;
    folderPath?: string;
    parentPath?: string;
    folderStructure?: FileNode[];
  }>;
};
