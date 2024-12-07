import React from "react";
import { SidebarItems, SidebarUserItems } from "../../utils/contants";

export const IconSidebar = ({ activeTab, onTabChange }) => {

  return (
    <div className="flex flex-col justify-between h-screen bg-[#1E1E1E]">
      <div className="w-16 bg-[#1E1E1E] flex flex-col items-center py-4 space-y-4">
        {SidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`p-2 rounded ${activeTab === item.name
                ? "bg-[#094771] text-white"
                : "text-[#959595] hover:bg-[#2C2C2C]"
              }`}
            title={item.tooltip}>
            <item.icon size={24} />
          </button>
        ))}
      </div>
      <div className="w-16 bg-[#1E1E1E] flex flex-col items-center py-4 space-y-4">
        {SidebarUserItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onTabChange(item.name)}
            className={`p-2 rounded ${activeTab === item.name
                ? "bg-[#094771] text-white"
                : "text-[#959595] hover:bg-[#2C2C2C]"
              }`}
            title={item.tooltip}>
            <item.icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
};
