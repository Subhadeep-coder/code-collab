// terminal.tsx
import React from 'react'

type Props = {
    
};

export const Terminal = (props: Props) => {
    return (
        <div className='border-t border-gray-500 bg-[#1e1e1e] text-white min-h-[200px] h-[200px] w-full overflow-auto p-2'>
            <div className="terminal-header flex justify-between items-center text-sm mb-2">
                <div className="tabs flex space-x-2">
                    <span className="active-tab">Terminal</span>
                    <span>Debug Console</span>
                </div>
                <div className="terminal-actions flex space-x-2">
                    <button className="hover:bg-gray-700 p-1">+</button>
                    <button className="hover:bg-gray-700 p-1">x</button>
                </div>
            </div>
            <div className="terminal-content overflow-y-auto">
                {/* Terminal content goes here */}
                <p className="text-gray-400">$</p>
            </div>
        </div>
    )
}