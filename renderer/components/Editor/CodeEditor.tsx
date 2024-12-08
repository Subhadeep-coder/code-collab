"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
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

    const [isCollaborative, setIsCollaborative] = useState<boolean>(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const checkCollaborativeMode = () => {
            if (typeof window !== 'undefined') {
                const urlParams = new URLSearchParams(window.location.search);
                const inviteCode = urlParams.get('invite');
                const collaborativeFlag = urlParams.get('collaborative');

                setIsCollaborative(!!inviteCode || collaborativeFlag === 'true');
            }
        };

        checkCollaborativeMode();
    }, []);

    if (!isClient) {
        return null;
    }

    if (!isCollaborative) {
        return <>{children}</>;
    }

    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            {children}
        </LiveblocksProvider>
    );
}