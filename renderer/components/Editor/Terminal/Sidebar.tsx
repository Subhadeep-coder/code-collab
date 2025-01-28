import type React from "react"
import { TerminalIcon } from "lucide-react"

type TerminalType = {
  id: string
  name: string
}

type Props = {
  terminals: TerminalType[]
  onSelectTerminal: (id: string) => void
  activeTerminal?: string
}

export const Sidebar: React.FC<Props> = ({
  terminals = [
    { id: "powershell", name: "powershell" },
  ],
  onSelectTerminal,
  activeTerminal,
}) => {
  return (
    <div className="bg-[#252526] text-[#cccccc] w-48">
      <div className="py-1">
        {terminals.map((terminal) => (
          <button
            key={terminal.id}
            onClick={() => onSelectTerminal(terminal.id)}
            className={`w-full flex items-center px-3 py-1 text-sm hover:bg-[#2a2d2e] ${
              activeTerminal === terminal.id ? "bg-[#37373d]" : ""
            }`}
          >
            <TerminalIcon className="h-4 w-4 mr-2 opacity-70" />
            <span>{terminal.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

