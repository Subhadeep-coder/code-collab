"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  GitBranch,
  Settings,
  ChevronRight,
  ChevronDown,
  UserCog,
  LogOut,
  Bell,
  Mail,
} from "lucide-react";

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
      case "user":
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b border-[#3C3C3C]">
              <div className="w-12 h-12 bg-blue-500 rounded-full mr-4 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <h2 className="text-sm font-bold">John Doe</h2>
                <p className="text-xs text-[#959595]">Software Engineer</p>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#959595] mb-2">
                  ACCOUNT
                </h3>
                <div className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer">
                  <UserCog size={16} className="mr-3 text-[#959595]" />
                  <span className="text-sm">Edit Profile</span>
                </div>
                <div className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer">
                  <Bell size={16} className="mr-3 text-[#959595]" />
                  <span className="text-sm">Notifications</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">
                    3
                  </span>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <h3 className="text-xs font-bold text-[#959595] mb-2">
                  COMMUNICATION
                </h3>
                <div className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer">
                  <Mail size={16} className="mr-3 text-[#959595]" />
                  <span className="text-sm">Messages</span>
                  <span className="ml-auto bg-green-500 text-white text-xs px-2 rounded-full">
                    2
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#3C3C3C] pt-4">
                <div
                  className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer text-red-400"
                  onClick={() => {
                    /* Logout logic */
                  }}>
                  <LogOut size={16} className="mr-3" />
                  <span className="text-sm">Logout</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "explorer":
        return (
          <div>
            <div
              className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
              onClick={() => toggleSection("explorer")}>
              {expandedSections.explorer ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
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
      case "search":
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
      case "sourceControl":
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
      case "settings":
        return (
          <div>
            <h2 className="text-sm font-bold mb-2">SETTINGS</h2>
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
    <div className="w-72 bg-[#252526] text-white p-4 overflow-y-auto">
      {renderContent()}
    </div>
  );
};
