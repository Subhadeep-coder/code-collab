'use client';

import { FileProvider } from "providers/file-provider";
import { AuthProvider } from "../providers/auth-provider";
import { TerminalProvider } from "providers/terminal-provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <FileProvider>
                <TerminalProvider>
                    {children}
                </TerminalProvider>
            </FileProvider>
        </AuthProvider>
    );
}