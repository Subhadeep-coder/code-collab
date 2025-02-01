import { useTerminalContext } from "providers/terminal-provider"
import { TerminalTopbar } from "./Terminal/TerminalTopbar"
// import { Terminal } from "./Terminal/Terminal"
import { TerminalSidebar } from "./Terminal/TerminalSidebar"
import dynamic from "next/dynamic"

const Terminal = dynamic({
  loader: () => import("./Terminal/Terminal").then((mod) => mod.Terminal)
}, { ssr: false });

export const TerminalContainer: React.FC = () => {
  const { terminals, activeTerminalId } = useTerminalContext()

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col pr-4">
        <TerminalTopbar />
        <div className="flex flex-grow">
          {
            terminals.map((terminal) => {

              return terminal.id === activeTerminalId && (
                <Terminal
                  key={terminal.id}
                  terminalId={terminal.id}
                // className={`flex-grow ${activeTerminalId === terminal.id ? "" : "hidden"}`}

                />
              );
            })
          }
          <TerminalSidebar />
        </div>
      </div>
    </div>
  )
}