import { ChevronDown, ChevronRight, Folder, FolderOpen, File } from "lucide-react"
import { useState } from "react"
import type { FileNode } from "../types/file-functions"
import { File as SelectedFile, useFileContext } from "providers/file-provider"

interface FileTreeProps {
  item: FileNode
  depth?: number
  selectedFile: SelectedFile | null
  onFileSelect: (name: string, content: string, filePath: string) => void
}

export const FileTree = ({ item, depth = 0, selectedFile, onFileSelect }: FileTreeProps) => {
  const { expandedFolders, toggleExpandedFolder } = useFileContext();
  const isExpanded = expandedFolders.has(item.path);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleExpandedFolder(item.path);
  };

  const handleFileClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!item.isDirectory) {
      const result = await window.context.openFile(item.path);
      if (result.success) {
        onFileSelect(result.fileName, result.content, item.path);
      }
    }
  }

  const sortItems = (items: FileNode[]): FileNode[] => {
    return [...items].sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name)
      }
      return a.isDirectory ? -1 : 1
    })
  }

  const isSelected = selectedFile?.path === item.path

  return (
    <div>
      <div
        className={`flex items-center hover:bg-[#2C2C2C] cursor-pointer py-[2px] ${isSelected ? "bg-[#37373D]" : ""}`}
        style={{ paddingLeft: `${depth * 12}px` }}
        onClick={handleFileClick}
      >
        {
          item.isDirectory ? (
            <>
              <span className="w-4 h-4 flex items-center justify-center" onClick={toggleExpand}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
              <span className="w-4 h-4 flex items-center justify-center ml-1">
                {
                  isExpanded ? (
                    <FolderOpen size={16} className="text-[#dcb67a]" />
                  ) : (
                    <Folder size={16} className="text-[#dcb67a]" />
                  )
                }
              </span>
            </>
          ) : (
            <>
              <span className="w-4 h-4" />
              <File size={16} className="ml-1 text-[#cccccc]" />
            </>
          )
        }
        <span className={`ml-1 text-sm truncate ${isSelected ? "text-white" : ""}`}>{item.name}</span>
      </div>

      {
        item.isDirectory && isExpanded && item.children && (
          <div>
            {
              sortItems(item.children).map((child, index) => (
                <FileTree
                  key={child.path + index}
                  item={child}
                  depth={depth + 1}
                  selectedFile={selectedFile}
                  onFileSelect={onFileSelect}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

