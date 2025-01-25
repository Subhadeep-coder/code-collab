"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FileContextType {
  selectedFolder: string | null;
  selectedFiles: File[] | null;
  setSelectedFolder: (folder: string | null) => void;
  setSelectedFiles: (files: File[] | null) => void;
}

interface File {
  name: string;
  content: string;
  isSave?: boolean;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  return (
    <FileContext.Provider
      value={{
        selectedFolder,
        setSelectedFolder,
        selectedFiles,
        setSelectedFiles,
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
