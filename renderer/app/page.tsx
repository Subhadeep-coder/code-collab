import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { CodeSpace } from '../components/CodeEditor'
import ExtraActivities from '../components/ExtraActivities'

export default function HomePage() {
    return (
        <>
            <div className="flex gap-x-3 h-full">
                <CodeSpace />
                <ExtraActivities />
            </div>
        </>
    )
}
