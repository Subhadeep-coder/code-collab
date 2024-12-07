import React from "react";
import { FileText, Search, GitBranch, Settings, UserRound } from "lucide-react";

export const IconSidebar = ({ activeTab, onTabChange }) => {
  const sidebarItems = [
    {
      icon: FileText,
      name: "explorer",
      tooltip: "Explorer",
    },
    {
      icon: Search,
      name: "search",
      tooltip: "Search",
    },
    {
      icon: GitBranch,
      name: "sourceControl",
      tooltip: "Source Control",
    },
  ];
  const sidebarUserItems = [
    {
      icon: UserRound,
      name: "user",
      tooltip: "User",
    },
    {
      icon: Settings,
      name: "settings",
      tooltip: "Settings",
    },
  ];

  return (
    <div className="w-16 flex flex-col justify-between h-screen bg-[#1E1E1E]">
      <div className="bg-[#1E1E1E] flex flex-col items-center py-4 space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`p-4 ${activeTab === item.name
                ? "border-l-2  text-white"
                : "text-[#959595] hover:text-white"
              }`}
            title={item.tooltip}>
            <item.icon size={24} />
          </button>
        ))}
      </div>
      <div className=" bg-[#1E1E1E] flex flex-col items-center py-4 space-y-1">
        {sidebarUserItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`p-4 ${activeTab === item.name
              ? "border-l-2  text-white"
              : "text-[#959595] hover:text-white"
            }`}
            title={item.tooltip}>
            <item.icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
};
