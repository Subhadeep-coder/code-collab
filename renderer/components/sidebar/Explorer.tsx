import { ChevronDown, ChevronRight, FolderOpen, File } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';

type Props = {};

export const Explorer = (props: Props) => {
  const [expandedSections, setExpandedSections] = useState({
    explorer: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="text-[#CCCCCC]">
      <div
        className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
        onClick={() => toggleSection("explorer")}
      >
        {
          expandedSections.explorer ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        }
        <span className="ml-2 text-sm">EXPLORER</span>
      </div>

      {
        expandedSections.explorer && (
          <div className="pl-4 mt-2 flex flex-col gap-2">
            <div className="text-sm text-[#969696] px-2">
              You have not yet opened a folder.
            </div>

            <div className="flex flex-col gap-1.5 px-2">
              <Button
                variant="ghost"
                className="h-8 justify-start text-sm bg-[#2D2D2D] hover:bg-[#37373D] text-[#CCCCCC]"
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Open Folder
              </Button>

              <Button
                variant="ghost"
                className="h-8 justify-start text-sm bg-[#2D2D2D] hover:bg-[#37373D] text-[#CCCCCC]"
              >
                <File className="mr-2 h-4 w-4" />
                Open File
              </Button>
            </div>

            <div className="mt-4 px-2">
              <div className="text-xs text-[#969696] mb-2">Recent</div>
              <div className="text-xs text-[#969696] italic">No Recent Folders</div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Explorer;