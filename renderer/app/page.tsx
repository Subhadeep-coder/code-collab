"use client";

import React, { useState } from 'react'
import { CodeSpace } from '../components/Editor/CodeEditor'
import ExtraActivities from '../components/ExtraActivities'
import { EnhancedCodeEditor } from '../components/Editor/NormalEditor'
import { CollaborativeEditor } from '../components/Editor/CollaborativeEditor'
import { AppLayout } from '../components/AppLayout'

export default function HomePage() {
    const [isCollaborative, setIsCollaborative] = useState<boolean>(false);

    return (
        <AppLayout>
            <div className="flex h-full overflow-hidden">
                <div className="flex-1 flex gap-x-3 h-full overflow-hidden">
                    {
                        isCollaborative ? (
                            <>
                                <CodeSpace>
                                    <CollaborativeEditor />
                                </CodeSpace>
                                <ExtraActivities />
                            </>
                        ) : (
                            <EnhancedCodeEditor />
                        )
                    }
                </div>
            </div>
        </AppLayout>
    )
}