import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  GitBranch, 
  Settings, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react';

export const IconSidebar = ({ activeTab, onTabChange }) => {
  const sidebarItems = [
    { 
      icon: FileText, 
      name: 'explorer', 
      tooltip: 'Explorer'
    },
    { 
      icon: Search, 
      name: 'search', 
      tooltip: 'Search'
    },
    { 
      icon: GitBranch, 
      name: 'sourceControl', 
      tooltip: 'Source Control'
    },
    { 
      icon: Settings, 
      name: 'settings', 
      tooltip: 'Settings'
    }
  ];

  return (
    <div className="w-16 bg-[#1E1E1E] flex flex-col items-center py-4 space-y-4">
      {sidebarItems.map((item) => (
        <button
          key={item.name}
          onClick={() => onTabChange(item.name)}
          className={`p-2 rounded ${
            activeTab === item.name 
              ? 'bg-[#094771] text-white' 
              : 'text-[#959595] hover:bg-[#2C2C2C]'
          }`}
          title={item.tooltip}
        >
          <item.icon size={24} />
        </button>
      ))}
    </div>
  );
};