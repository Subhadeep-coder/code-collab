import { FileTree } from "components/FileTree"
import { Button } from "components/ui/button"
import { ChevronDown, ChevronRight, FolderOpen, File, PlusSquare, FolderPlus, ChevronsLeft } from "lucide-react"
import React from "react"
import { FileNode } from "types/file-functions"
import { useFileContext } from "providers/file-provider"

export const Explorer = () => {
  // const [folderPath, setFolderPath] = useState<string | undefined>()
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
  } = useFileContext();

  // const toggleSection = (section: keyof typeof expandedSections) => {
  //   setExpandedSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }))
  // }

  const handleOpenFolder = async () => {
    const result = await window.context.openFolder()
    console.log("Open Folder Result: ", result)
    if (result.success) {
      // setFolderPath(result.folderPath)
      setSelectedFolder(result.rootFolderName);
      setFolderStructure(result.folderStructure)
    }
  }

  const handleOpenFile = async () => {
    const result = await window.context.openFile();
    console.log("Open File Result: ", result);
    if (result.success && result.filePath) {
      const filePath = result.filePath;
      const fileContent = result.content;
      const fileName = result.fileName;
      const extension = filePath.split('.').pop() || '';

      // Set selected file and add to recent files
      setSelectedFile({ name: fileName, content: fileContent, path: filePath, isSave: true, extension });
      addRecentFile({ name: fileName, content: fileContent, path: filePath, isSave: true, extension });

      console.log("Opening file:", filePath);
    }
  }

  const handleCreateNewFile = () => {
    // Implement new file creation logic here
    console.log("Create new file")
  }

  const handleCreateNewFolder = () => {
    // Implement new folder creation logic here
    console.log("Create new folder")
  }

  const handleCollapseFolders = () => {
    // Implement folder collapse logic here
    console.log("Collapse all folders")
  }

  const handleFileSelect = (name: string, content: string, filePath: string) => {
    const extension = filePath.split('.').pop() || '';
    setSelectedFile({ name, content, path: filePath, isSave: true, extension })
    addRecentFile({ name, content, path: filePath, isSave: true, extension });
    console.log("Opening file:", filePath)
  }

  const sortItems = (items: FileNode[]): FileNode[] => {
    return [...items].sort((a, b) => {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name)
      }
      return a.isDirectory ? -1 : 1
    })
  }

  return (
    <div className="text-[#CCCCCC]">
      <div className="flex items-center justify-between cursor-pointer hover:bg-[#2C2C2C] p-1">
        <div className="flex items-center"
        // onClick={() => toggleSection("explorer")}
        >
          {
            expandedFolders.has("explorer")
              ? <ChevronDown size={16} />
              : <ChevronRight size={16} />
          }
          <span className="ml-2 text-sm">{selectedFolder === null ? "EXPLORER" : selectedFolder}</span>
        </div>
        <span className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCreateNewFile}>
            <PlusSquare size={16} className="text-[#CCCCCC]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCreateNewFolder}>
            <FolderPlus size={16} className="text-[#CCCCCC]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCollapseFolders}>
            <ChevronsLeft size={16} className="text-[#CCCCCC]" />
          </Button>
        </span>
      </div>

      {
        expandedFolders.has("explorer") && (
          <div className="pl-4 mt-2 flex flex-col gap-2">
            {
              !folderStructure ? (
                <>
                  <div className="text-sm text-[#969696] px-2">You have not yet opened a folder.</div>

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
                    <div className="text-xs text-[#969696] italic">No Recent Folders</div>
                  </div>
                </>
              ) : (
                <div className="px-2">
                  {
                    sortItems(folderStructure).map((item) => (
                      <FileTree
                        key={item.path}
                        item={item}
                        selectedFile={selectedFile}
                        onFileSelect={handleFileSelect}
                      />
                    ))
                  }
                </div>
              )
            }
          </div>
        )}
    </div>
  )
}

export default Explorer

