import { ExpandableSidebar } from "./ExpandableSidebar";
import { IconSidebar } from "./IconSidebar";
import { useState } from "react";

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('explorer');
  
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