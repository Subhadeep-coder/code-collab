"use client";

import React, { PropsWithChildren } from "react";
import { LiveblocksProvider } from "@liveblocks/react";

type Props = {
    children: React.ReactNode;
};

export const CodeSpace = ({ children }: Props) => {
    return (
        <div className="border border-blue-400 h-full w-full">
            <Providers>
                {children}
            </Providers>
        </div>
    )
}


export function Providers({ children }: PropsWithChildren) {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            {children}
        </LiveblocksProvider>
    );
}