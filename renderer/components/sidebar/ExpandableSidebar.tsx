"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  UserCog,
  LogOut,
  Bell,
  Mail,
} from "lucide-react";
import { SidebarItemsTypes } from "../../utils/contants";
import { UserItem } from "./UserItem";
import { Explorer } from "./Explorer";

export const ExpandableSidebar = ({ activeTab }) => {
  const [expandedSections, setExpandedSections] = useState({
    explorer: true,
    search: false,
    sourceControl: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case SidebarItemsTypes.USER:
        return (
          <UserItem />
        );
      case SidebarItemsTypes.EXPLORER:
        return (
          <Explorer />
        );
      case SidebarItemsTypes.SEARCH:
        return (
          <div>
            <div
              className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
              onClick={() => toggleSection("search")}>
              {expandedSections.search ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <span className="ml-2 text-sm">SEARCH</span>
            </div>
            {expandedSections.search && (
              <input
                type="text"
                placeholder="Search files"
                className="w-full bg-[#3C3C3C] text-white p-2 mt-2 rounded text-sm outline-none"
              />
            )}
          </div>
        );
      case SidebarItemsTypes.SOURCE_CONTROL:
        return (
          <div>
            <div
              className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
              onClick={() => toggleSection("sourceControl")}>
              {expandedSections.sourceControl ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <span className="ml-2 text-sm">SOURCE CONTROL</span>
            </div>
            {expandedSections.sourceControl && (
              <div className="text-sm mt-2">
                <div className="text-[#959595]">No changes</div>
              </div>
            )}
          </div>
        );
      case SidebarItemsTypes.SETTINGS:
        return (
          <div>
            <h1 className="text-sm font-bold pt-2 pl-2 pb-2">SETTINGS</h1>
            <div className="space-y-2">
              <div className="hover:bg-[#37373D] p-2 rounded">
                User Settings
              </div>
              <div className="hover:bg-[#37373D] p-2 rounded">
                Workspace Settings
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-60 bg-[#252526] text-white p-1 overflow-y-auto">
      {renderContent()}
    </div>
  );
};
