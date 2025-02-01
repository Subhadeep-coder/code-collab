'use client'

import { Bell, LogOut, Mail, UserCog } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../providers/auth-provider'
import { authService } from 'lib/auth-service'

export const UserItem = () => {
    const { user, logout, isLoading } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout();
            await authService.logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed', error)
        }
    }

    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>
    }

    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center h-full p-4">
                <div className="space-y-4 w-full max-w-xs">
                    <Link
                        href="/login"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded text-center block hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded text-center block hover:bg-blue-50 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b border-[#3C3C3C]">
                <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold truncate">{user.name || 'User'}</h2>
                    <p className="text-xs text-[#959595] truncate">{user.email}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-[#959595] mb-2">
                        ACCOUNT
                    </h3>
                    <div className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer">
                        <UserCog size={16} className="mr-3 text-[#959595] flex-shrink-0" />
                        <span className="text-sm truncate">Edit Profile</span>
                    </div>
                    <div className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer">
                        <Bell size={16} className="mr-3 text-[#959595] flex-shrink-0" />
                        <span className="text-sm truncate">Notifications</span>
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full flex-shrink-0">
                            3
                        </span>
                    </div>
                </div>

                <div className="space-y-2 mt-4">
                    <h3 className="text-xs font-bold text-[#959595] mb-2">
                        COMMUNICATION
                    </h3>
                    <div className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer">
                        <Mail size={16} className="mr-3 text-[#959595] flex-shrink-0" />
                        <span className="text-sm truncate">Messages</span>
                        <span className="ml-auto bg-green-500 text-white text-xs px-2 rounded-full flex-shrink-0">
                            2
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#3C3C3C] p-4">
                <div
                    className="flex items-center hover:bg-[#37373D] p-2 rounded cursor-pointer text-red-400"
                    onClick={handleLogout}>
                    <LogOut size={16} className="mr-3 flex-shrink-0" />
                    <span className="text-sm truncate">Logout</span>
                </div>
            </div>
        </div>
    )
}