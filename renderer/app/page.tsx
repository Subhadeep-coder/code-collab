import React from 'react'
import { CodeSpace } from '../components/CodeEditor'
import ExtraActivities from '../components/ExtraActivities'
import { Room } from '../components/Room'
import { CollaborativeEditor } from '../components/CollaborativeEditor'

export default function HomePage() {
    return (
        <>
            <div className="flex gap-x-3 h-full">
                <CodeSpace>
                    <Room>
                        <CollaborativeEditor />
                    </Room>
                </CodeSpace>
                <ExtraActivities />
            </div>
        </>
    )
}
