import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  GitBranch, 
  Settings, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';

export const ExpandableSidebar = ({ activeTab }) => {
    const [expandedSections, setExpandedSections] = useState({
      explorer: true,
      search: false,
      sourceControl: false,
    });
  
    const toggleSection = (section) => {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };
  
    const renderContent = () => {
      switch(activeTab) {
        case 'explorer':
          return (
            <div>
              <div 
                className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
                onClick={() => toggleSection('explorer')}
              >
                {expandedSections.explorer ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="ml-2 text-sm">EXPLORER</span>
              </div>
              {expandedSections.explorer && (
                <div className="pl-4 text-sm">
                  <div className="hover:bg-[#37373D] p-1">📁 project-folder</div>
                  <div className="hover:bg-[#37373D] p-1">📄 README.md</div>
                  <div className="hover:bg-[#37373D] p-1">📄 package.json</div>
                </div>
              )}
            </div>
          );
        case 'search':
          return (
            <div>
              <div 
                className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
                onClick={() => toggleSection('search')}
              >
                {expandedSections.search ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="ml-2 text-sm">SEARCH</span>
              </div>
              {expandedSections.search && (
                <input 
                  type="text" 
                  placeholder="Search files" 
                  className="w-full bg-[#3C3C3C] text-white p-2 mt-2 rounded text-sm"
                />
              )}
            </div>
          );
        case 'sourceControl':
          return (
            <div>
              <div 
                className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
                onClick={() => toggleSection('sourceControl')}
              >
                {expandedSections.sourceControl ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="ml-2 text-sm">SOURCE CONTROL</span>
              </div>
              {expandedSections.sourceControl && (
                <div className="text-sm mt-2">
                  <div className="text-[#959595]">No changes</div>
                </div>
              )}
            </div>
          );
        case 'settings':
          return (
            <div>
              <h2 className="text-sm font-bold mb-2">SETTINGS</h2>
              <div className="space-y-2">
                <div className="hover:bg-[#37373D] p-2 rounded">User Settings</div>
                <div className="hover:bg-[#37373D] p-2 rounded">Workspace Settings</div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="w-72 bg-[#252526] text-white p-4 overflow-y-auto">
        {renderContent()}
      </div>
    );
  };