"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useFileContext } from "providers/file-provider";

const Editor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.Editor),
  { ssr: false }
);

// Define a hashmap to map file extensions to Monaco language codes
const extensionToLanguageMap: { [key: string]: string } = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  py: "python",
  java: "java",
  csharp: "csharp",
  cs: "csharp",
  cpp: "cpp",
  c: "cpp", // Treat 'c' as C++
  go: "go",
  ruby: "ruby",
  php: "php",
};

interface EnhancedCodeEditorProps {
  filePath: string;
  fileContent: string;
  extension: string
}

export const EnhancedCodeEditor: React.FC<EnhancedCodeEditorProps> = ({
  filePath,
  fileContent,
  extension
}) => {
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [content, setContent] = useState(fileContent);
  const { recentFiles, setSelectedFile, addRecentFile, removeSelectedFile } = useFileContext();
  const [activeFile, setActiveFile] = useState<{ name: string; content: string; path: string, extension: string } | null>({
    name: filePath.split("/").pop() || "Untitled",
    content: fileContent,
    path: filePath,
    extension: extension
  });

  useEffect(() => {
    setContent(fileContent);
  }, [fileContent]);

  const language = extensionToLanguageMap[extension || ''] || 'plaintext';

  const handleFontSizeChange = (delta: number) => {
    setFontSize((prevSize) => Math.max(8, Math.min(prevSize + delta, 24)));
  };
  const handleFileSelect = (file: { name: string; content: string; path: string, extension: string }) => {
    setActiveFile(file);
    setContent(file.content);
    setSelectedFile(file);
    addRecentFile(file);
  };

  const handleCloseTab = (filePath: string) => {
    removeSelectedFile(filePath);
    if (activeFile?.path === filePath) {
      setActiveFile(recentFiles[recentFiles.length - 1]);
      setContent(recentFiles[recentFiles.length - 1].content);
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0 bg-[#1e1e1e]">
      {/* Recent Files Tab */}
      <div className="flex items-center p-2 border-b border-[#3C3C3C] bg-[#252526] shrink-0 space-x-2">
        {recentFiles.length > 0 ? (
          recentFiles.map((file) => (
            <div
              key={file.path}
              className="flex items-center space-x-2 text-white cursor-pointer"
              onClick={() => handleFileSelect(file)}
            >
              <span>{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering file select when clicking close
                  handleCloseTab(file.path);
                }}
                className="h-6 w-6 border-[#3C3C3C] text-white hover:bg-[#37373D]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <span className="text-sm text-gray-400">No recent files</span>
        )}
      </div>

      {/* File Path */}
      <div className="px-3 py-1 text-sm text-gray-400 bg-[#252526] border-b border-[#3C3C3C]">
        {filePath ? filePath.split(/[/\\]/).join(" › ") : "No file selected"}
      </div>

      {/* Code Editor */}
      <div className="flex-grow min-h-0">
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={content}
          onChange={(newValue) => setContent(newValue || "")}
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 10, bottom: 10 },
            lineNumbers: "on",
            renderLineHighlight: "all",
            contextmenu: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedCodeEditor;
