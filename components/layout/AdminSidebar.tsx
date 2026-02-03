'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    LayoutDashboard,
    Plane,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'My Trips', href: '/trips', icon: Plane },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

const bottomNav = [
    { name: 'Settings', href: '/profile', icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            const supabase = createClient()
            await supabase.auth.signOut()
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            toast.error('Failed to logout')
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-background border shadow-lg"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed left-0 top-0 z-40 h-screen w-64 
          bg-card border-r shadow-xl
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center px-6 border-b">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                                <Plane className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-lg">Globetrotter</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }
                  `}
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Bottom navigation */}
                    <div className="border-t p-3 space-y-1">
                        {bottomNav.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }
                  `}
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}

                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                text-destructive hover:bg-destructive/10
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                        >
                            <LogOut className="h-5 w-5 flex-shrink-0" />
                            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
