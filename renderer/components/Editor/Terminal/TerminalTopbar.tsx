"use client";

import { Plus, X } from "lucide-react"
import { useTerminalContext } from "providers/terminal-provider"
import { useState } from "react"

export const TerminalTopbar: React.FC = () => {
  const { addTerminal, removeTerminal, activeTerminalId } = useTerminalContext()
  const [activeTopbarElement, setActiveTopbarElement] = useState<number>(1)

  const topbarElements = [
    { id: 1, name: "Terminal" },
    { id: 2, name: "Output" },
  ]

  return (
    <div className='flex h-9 items-center justify-between bg-[#1e1e1e] text-[#cccccc] '>
      <div className='flex h-full items-center'>
        {topbarElements.map((element) => (
          <button
            key={element.id}
            className={`h-full px-4 text-sm font-medium hover:text-white ${
              activeTopbarElement === element.id ? "text-white border-b border-[#686984]" : "text-gray-500"
            }`}
            onClick={() => setActiveTopbarElement(element.id)}
          >
            {element.name}
          </button>
        ))}
      </div>
      <div className='flex items-center pr-2'>
        <button
          onClick={addTerminal}
          className='p-1.5 hover:bg-[#ffffff1a] rounded-sm'
          aria-label='New Terminal'
        >
          <Plus className='h-4 w-4' />
        </button>
        <button
          // onClick={() => removeTerminal(activeTerminalId)}
          className='p-1.5 hover:bg-[#ffffff1a] rounded-sm'
          aria-label='Close Terminal'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  )
}
