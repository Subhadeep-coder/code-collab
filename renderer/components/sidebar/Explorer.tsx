import { ChevronDown } from 'lucide-react'
import React from 'react'

type Props = {}

export const Explorer = (props: Props) => {
    return (
        <div>
            <div
              className="flex items-center cursor-pointer hover:bg-[#2C2C2C] p-1"
            //   onClick={() => toggleSection("explorer")}
              >
              {/* {expandedSections.explorer ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )} */}
              <span className="ml-2 text-sm">EXPLORER</span>
            </div>
            {/* {expandedSections.explorer && (
              <div className="pl-4 text-sm">
                <div className="hover:bg-[#37373D] p-1">📁 project-folder</div>
                <div className="hover:bg-[#37373D] p-1">📄 README.md</div>
                <div className="hover:bg-[#37373D] p-1">📄 package.json</div>
              </div>
            )} */}
          </div>
    )
}