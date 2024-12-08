"use client";

import React from 'react';
// import { Editor } from '@monaco-editor/react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
    () => import('@monaco-editor/react').then((mod) => mod.Editor),
    { ssr: false }
  );

export const NormalCodeEditor = () => {
    return (
        <Editor
            height="100%"
            defaultLanguage="typescript"
            defaultValue="// Start coding here..."
            options={{
                minimap: { enabled: false },
            }}
        />
    );
};