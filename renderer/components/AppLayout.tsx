import React from "react";
import { CodeSpace } from "./CodeEditor";
import { Terminal } from "./Terminal";

type Props = {
    children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
    return (
        <div className="w-full h-full flex gap-x-2">
            {children}
            <div className="h-full w-full flex flex-col gap-y-2">
                <CodeSpace />
                <Terminal />
            </div>
        </div>
    )
}
