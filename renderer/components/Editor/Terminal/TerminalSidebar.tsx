import { terminalService } from "lib/terminal-service";
import { TerminalIcon, Trash } from "lucide-react";
import { useTerminalContext } from "providers/terminal-provider";

export const TerminalSidebar: React.FC = () => {
  const { terminals, activeTerminalId, selectTerminal, removeTerminal } = useTerminalContext();

  const handleKillTerminal = (terminalId: string) => {
    const success = terminalService.killTerminal(terminalId);
    if (success) {
      removeTerminal(terminalId);
    }
  }

  return (
    <div className='bg-[#252526] text-[#cccccc] w-48'>
      <div className='py-1'>
        {
          terminals.map((terminal) => (
            <div
              className={`flex items-center justify-center hover:bg-[#ffffff1a]  ${activeTerminalId === terminal.id ? "bg-[#37373d]" : ""
                }`}
            >
              <button
                key={terminal.id}
                onClick={() => selectTerminal(terminal.id)}
                className={`flex items-center px-3 py-1 text-sm`}
              >
                <TerminalIcon className='h-4 w-4 mr-2 opacity-70' />
                <span>{terminal.name}</span>
              </button>
              <button
                onClick={() => handleKillTerminal(terminal.id)}
                className='p-1.5 rounded-sm'
                aria-label='Close Terminal'
              >
                <Trash className='h-4 w-4' />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};
