import { useTerminalContext } from "providers/terminal-provider"
import { TerminalTopbar } from "./Terminal/TerminalTopbar"
import { Terminal } from "./Terminal/Terminal"
import { TerminalSidebar } from "./Terminal/TerminalSidebar"

export const TerminalContainer: React.FC = () => {
  const { terminals, activeTerminalId } = useTerminalContext()

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col pr-4">
        <TerminalTopbar />
        <div className="flex flex-grow">
          {/* Render only the active terminal */}
          {terminals.map((terminal) => (
              <Terminal 
                key={terminal.id} 
                terminalId={terminal.id} 
                className={`flex-grow ${activeTerminalId === terminal.id ? "" : "hidden"}`}
                 
              />
          ))}
          <TerminalSidebar />
        </div>
      </div>
    </div>
  )
}