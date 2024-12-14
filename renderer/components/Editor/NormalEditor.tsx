"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const Editor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.Editor),
  { ssr: false }
);

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
];

const themes = [
  { value: "vs-dark", label: "Dark" },
  { value: "light", label: "Light" },
];

export const EnhancedCodeEditor: React.FC = () => {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);

  const handleFontSizeChange = (delta: number) => {
    setFontSize((prevSize) => Math.max(8, Math.min(prevSize + delta, 24)));
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      <div className="flex items-center justify-between p-2 border-b border-[#3C3C3C] bg-[#252526]">
        <div className="flex items-center space-x-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-8 w-[180px] border-[#3C3C3C] bg-[#3C3C3C] text-white">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-[#252526] border-[#3C3C3C]">
              {languages.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="text-white hover:bg-[#37373D] focus:bg-[#37373D]">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="h-8 w-[100px] border-[#3C3C3C] bg-[#3C3C3C] text-white">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-[#252526] border-[#3C3C3C]">
              {themes.map((t) => (
                <SelectItem
                  key={t.value}
                  value={t.value}
                  className="text-white hover:bg-[#37373D] focus:bg-[#37373D]">
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleFontSizeChange(-1)}
            className="h-8 w-8 border-[#3C3C3C] bg-[#3C3C3C] text-white hover:bg-[#37373D]">
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-white min-w-[3ch] text-center">
            {fontSize}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleFontSizeChange(1)}
            className="h-8 w-8 border-[#3C3C3C] bg-[#3C3C3C] text-white hover:bg-[#37373D]">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-grow ">
        <Editor
          height="100%"
          language={language}
          theme={theme}
          defaultValue="// Start coding here..."
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 10 },
            lineNumbers: "on",
            renderLineHighlight: "all",
            contextmenu: true,
            automaticLayout: true,
          }}
          className="w-full h-full overflow-x-hidden"
        />
      </div>
    </div>
  );
};
