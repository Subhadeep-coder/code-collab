"use client";
import { useState } from "react";
import { ExpandableSidebar } from "./ExpandableSidebar";
import { IconSidebar } from "./IconSidebar";
import { SidebarItemsTypes } from "../utils/contants";

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(SidebarItemsTypes.EXPLORER);
  
    return (
      <div className="flex h-screen bg-[#252526]">
        <IconSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <ExpandableSidebar activeTab={activeTab} />
      </div>
    );
  };
  
  export default Sidebar;