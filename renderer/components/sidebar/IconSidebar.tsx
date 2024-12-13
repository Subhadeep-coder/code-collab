import React from "react";
import { SidebarItems, SidebarUserItems } from "../../utils/contants";

export const IconSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-16 flex flex-col justify-between h-screen bg-[#1E1E1E]">
      <div className="bg-[#1E1E1E] flex flex-col items-center py-4 space-y-1">
        {SidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`p-4 ${
              activeTab === item.name
                ? "border-l-2  text-white"
                : "text-[#959595] hover:text-white"
            }`}
            title={item.tooltip}>
            <item.icon size={24} />
          </button>
        ))}
      </div>
      <div className=" bg-[#1E1E1E] flex flex-col items-center py-4 space-y-1">
        {SidebarUserItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`p-4 ${
              activeTab === item.name
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
