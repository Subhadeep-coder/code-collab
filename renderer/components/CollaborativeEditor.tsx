"use client";

import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import { Cursors } from "./Cursors";
import { Toolbar } from "./Toolbar";

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
    const room = useRoom();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

    // Set up Liveblocks Yjs provider and attach Monaco editor
    useEffect(() => {
        let yProvider: LiveblocksYjsProvider;
        let yDoc: Y.Doc;
        let binding: MonacoBinding;

        if (editorRef) {
            yDoc = new Y.Doc();
            const yText = yDoc.getText("monaco");
            yProvider = new LiveblocksYjsProvider(room, yDoc);
            setProvider(yProvider);

            // Attach Yjs to Monaco
            binding = new MonacoBinding(
                yText,
                editorRef.getModel() as editor.ITextModel,
                new Set([editorRef]),
                yProvider.awareness as unknown as Awareness
            );
        }

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
            binding?.destroy();
        };
    }, [editorRef, room]);

    const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
        setEditorRef(e);
    }, []);

    return (
        <div className="flex flex-col relative border rounded-xl bg-white w-full h-full overflow-hidden">
            {provider ? <Cursors yProvider={provider} /> : null}
            <div className="flex justify-between items-center">
                <div>{editorRef ? <Toolbar editor={editorRef} /> : null}</div>
            </div>
            <div className="relative grow">
                <Editor
                    onMount={handleOnMount}
                    height="100%"
                    width="100hw"
                    theme="vs-light"
                    defaultLanguage="typescript"
                    defaultValue=""
                    options={{
                        tabSize: 2,
                        padding: { top: 20 },
                    }}
                />
            </div>
        </div>
    );
}
