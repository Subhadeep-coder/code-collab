import { useTerminalContext } from "providers/terminal-provider";
import { TerminalTopbar } from "./Terminal/TerminalTopbar";
import { TerminalSidebar } from "./Terminal/TerminalSidebar";
import dynamic from "next/dynamic";
import { useState } from "react";

const Terminal = dynamic(
  () =>
    import("./Terminal/Terminal").then((mod) => mod.Terminal),
  {
    ssr: false,
    loading: () => null,
  }
);

export const TerminalContainer: React.FC = () => {
  const { terminals, activeTerminalId } = useTerminalContext();
  const [terminalMounted, setTerminalMounted] = useState(false);

  const handleTerminalMount = () => {
    setTerminalMounted(true);
  };

  if (!terminalMounted) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading Terminal...
        <div style={{ visibility: "hidden", position: "absolute" }}>
          {
            terminals.map((terminal) =>
              terminal.id === activeTerminalId && (
                <Terminal
                  key={terminal.id}
                  terminalId={terminal.id}
                  onMount={handleTerminalMount}
                />
              )
            )
          }
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col pr-4">
        <TerminalTopbar />
        <div className="flex flex-grow">
          {
            terminals.map((terminal) =>
              terminal.id === activeTerminalId && (
                <Terminal
                  key={terminal.id}
                  terminalId={terminal.id}
                  onMount={handleTerminalMount}
                />
              )
            )
          }
          <TerminalSidebar />
        </div>
      </div>
    </div>
  );
};
