"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { FileNode } from "types/file-functions";

export interface File {
  name: string;
  content: string;
  path: string;
  extension: string;
  isSave?: boolean;
}

interface FileContextType {
  selectedFolder: string | null;
  folderStructure: FileNode[] | null;
  selectedFile: File | null;
  expandedFolders: Set<string>;
  recentFiles: File[];
  setSelectedFolder: (folder: string | null) => void;
  setFolderStructure: (structure: FileNode[] | null) => void;
  setSelectedFile: (file: File | null) => void;
  addSelectedFile: (file: File) => void;
  removeSelectedFile: (filePath: string) => void;
  setExpandedFolders: (folders: Set<string>) => void;
  toggleExpandedFolder: (folderPath: string) => void;
  addRecentFile: (file: File) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["explorer"]));
  const [recentFiles, setRecentFiles] = useState<File[]>([]);
  const [folderStructure, setFolderStructure] = useState<FileNode[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const addSelectedFile = (file: File) => {
    setRecentFiles((prevFiles) => {
      if (!prevFiles.some((f) => f.path === file.path)) {
        return [...prevFiles, file];
      }
      return prevFiles;
    });
  };

  const removeSelectedFile = (filePath: string) => {
    setRecentFiles((prevFiles) => prevFiles.filter((f) => f.path !== filePath));
  };

  const toggleExpandedFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const addRecentFile = (file: File) => {
    setRecentFiles((prevFiles) => {
      const existingFileIndex = prevFiles.findIndex((f) => f.path === file.path);
      if (existingFileIndex >= 0) {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(existingFileIndex, 1);
        return [file, ...updatedFiles];
      }
      return [file, ...prevFiles.slice(0, 9)];
    });
  };

  return (
    <FileContext.Provider
      value={{
        selectedFolder,
        folderStructure,
        selectedFile,
        expandedFolders,
        recentFiles,
        setSelectedFolder,
        setFolderStructure,
        setSelectedFile,
        addSelectedFile,
        removeSelectedFile,
        setExpandedFolders,
        toggleExpandedFolder,
        addRecentFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
