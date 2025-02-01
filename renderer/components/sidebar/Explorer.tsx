import { FileTree } from "components/FileTree"
import { Button } from "components/ui/button"
import { ChevronDown, ChevronRight, FolderOpen, File, PlusSquare, FolderPlus, ChevronsLeft } from "lucide-react"
import React, { useState, useRef, useEffect } from "react"
import { FileNode } from "types/file-functions"
import { useFileContext } from "providers/file-provider"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { fileService } from "lib/file-service"

export const Explorer = () => {
  const {
    selectedFolder,
    folderStructure,
    setSelectedFolder,
    setFolderStructure,
    expandedFolders,
    toggleExpandedFolder,
    selectedFile,
    setSelectedFile,
    addRecentFile,
    setRootFolderPath,
  } = useFileContext();

  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFolderPath, setSelectedFolderPath] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreatingFolder && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreatingFolder]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedFolderPath) {
        await handleDeleteFolder();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFolderPath]);

  const handleOpenFolder = async () => {
    const result = await fileService.openFolder();
    if (result.success) {
      setSelectedFolder(result.rootFolderName);
      setFolderStructure(result.folderStructure);
      setRootFolderPath(result.folderPath);

    }
  }

  const handleFolderSelect = (path: string) => {
    setSelectedFolderPath(path === selectedFolderPath ? null : path);
  };

  const handleDeleteFolder = async () => {
    if (!selectedFolderPath) return;

    const confirmDelete = window.confirm(`Are you sure you want to delete this folder?`);
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      // Add this method to your preload/main process
      const result = await fileService.deleteFolder(selectedFolderPath);

      if (result.success) {
        toast.success(result.message || "Folder deleted successfully");
        if (result.folderStructure) {
          setFolderStructure(result.folderStructure);
        }
        setSelectedFolderPath(null);
      } else {
        toast.error(result.message || "Failed to delete folder");
      }
    } catch (error) {
      toast.error("Failed to delete folder");
      console.error("Error deleting folder:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenFile = async () => {
    const result = await fileService.openFile();
    if (result.success && result.filePath) {
      const filePath = result.filePath;
      const fileContent = result.content;
      const fileName = result.fileName;
      const extension = filePath.split('.').pop() || '';

      setSelectedFile({
        name: fileName,
        content: fileContent,
        path: filePath,
        isSave: true,
        extension
      });
      addRecentFile({
        name: fileName,
        content: fileContent,
        path: filePath,
        isSave: true,
        extension
      });
    }
  }

  const handleCreateNewFolder = async () => {
    if (!newFolderName.trim()) {
      cancelNewFolder();
      return;
    }

    setIsLoading(true);
    try {
      const result = await fileService.createFolder(newFolderName);

      if (result.success) {
        toast.success(result.message);
        if (result.folderStructure) {
          setFolderStructure(result.folderStructure);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to create folder");
      console.error("Error creating folder:", error);
    } finally {
      setIsLoading(false);
      cancelNewFolder();
    }
  }

  const startNewFolder = () => {
    if (!folderStructure) {
      toast.error("Please open a folder first");
      return;
    }
    setIsCreatingFolder(true);
    setNewFolderName("");
  }

  const cancelNewFolder = () => {
    setIsCreatingFolder(false);
    setNewFolderName("");
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleCreateNewFolder();
    } else if (e.key === 'Escape') {
      cancelNewFolder();
    }
  }

  const handleCreateNewFile = () => {
    if (!folderStructure) {
      toast.error("Please open a folder first");
      return;
    }
    // window.context.createFile();
  }

  const handleCollapseFolders = () => {
    const newExpandedFolders = new Set<string>();
    newExpandedFolders.add("explorer");
    toggleExpandedFolder("dummy");
  }

  const handleFileSelect = (name: string, content: string, filePath: string) => {
    const extension = filePath.split('.').pop() || '';
    setSelectedFile({
      name,
      content,
      path: filePath,
      isSave: true,
      extension
    });
    addRecentFile({
      name,
      content,
      path: filePath,
      isSave: true,
      extension
    });
  }

  const sortItems = (items: FileNode[]): FileNode[] => {
    return [...items].sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name);
      }
      return a.isDirectory ? -1 : 1;
    });
  }

  return (
    <div className="text-[#CCCCCC]">
      <div className="flex items-center justify-between cursor-pointer hover:bg-[#2C2C2C] p-1">
        <div
          className="flex items-center"
          onClick={() => toggleExpandedFolder("explorer")}
        >
          {expandedFolders.has("explorer")
            ? <ChevronDown size={16} />
            : <ChevronRight size={16} />
          }
          <span className="ml-2 text-sm">
            {selectedFolder === null ? "EXPLORER" : selectedFolder}
          </span>
        </div>
        <span className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleCreateNewFile}
          >
            <PlusSquare size={16} className="text-[#CCCCCC]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={startNewFolder}
          >
            <FolderPlus size={16} className="text-[#CCCCCC]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleCollapseFolders}
          >
            <ChevronsLeft size={16} className="text-[#CCCCCC]" />
          </Button>
        </span>
      </div>

      {expandedFolders.has("explorer") && (
        <div className="pl-4 mt-2 flex flex-col gap-2">
          {!folderStructure ? (
            <>
              <div className="text-sm text-[#969696] px-2">
                You have not yet opened a folder.
              </div>

              <div className="flex flex-col gap-1.5 px-2">
                <Button
                  variant="ghost"
                  className="h-8 justify-start text-sm bg-[#2D2D2D] hover:bg-[#37373D] text-[#CCCCCC]"
                  onClick={handleOpenFolder}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Open Folder
                </Button>

                <Button
                  variant="ghost"
                  className="h-8 justify-start text-sm bg-[#2D2D2D] hover:bg-[#37373D] text-[#CCCCCC]"
                  onClick={handleOpenFile}
                >
                  <File className="mr-2 h-4 w-4" />
                  Open File
                </Button>
              </div>

              <div className="mt-4 px-2">
                <div className="text-xs text-[#969696] mb-2">Recent</div>
                <div className="text-xs text-[#969696] italic">
                  No Recent Folders
                </div>
              </div>
            </>
          ) : (
            <div className="px-2">
              {isCreatingFolder && (
                <div className="flex items-center py-1">
                  <FolderPlus size={16} className="text-[#CCCCCC] mr-2" />
                  <Input
                    ref={inputRef}
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={cancelNewFolder}
                    className="h-6 bg-[#3C3C3C] border-[#3C3C3C] text-sm"
                    placeholder="Folder name..."
                    disabled={isLoading}
                  />
                </div>
              )}
              {sortItems(folderStructure).map((item) => (
                <FileTree
                  key={item.path}
                  item={item}
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explorer;