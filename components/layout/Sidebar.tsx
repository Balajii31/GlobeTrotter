'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    LayoutDashboard,
    Plane,
    MapPin,
    Shield,
    Settings,
    LogOut,
    Menu,
    X,
    User
} from 'lucide-react'
import { Logo } from '@/components/icons/Logo'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', href: '/trips', icon: Plane },
    { name: 'Activities', href: '/activities', icon: MapPin },
    { name: 'Admin Panel', href: '/admin', icon: Shield },
]

const bottomNav = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
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
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border shadow-lg hover:bg-accent transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
          fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-72
          bg-card border-r shadow-xl
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center px-6 border-b bg-gradient-to-r from-primary/10 to-accent/10">
                        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg p-1">
                                <Logo className="h-6 w-6" />
                            </div>
                            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Globetrotter
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto">
                        <div className="px-3 mb-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Main Menu
                            </p>
                        </div>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                    group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium
                    transition-all duration-200 relative overflow-hidden
                    ${isActive
                                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                        }
                  `}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
                                    )}
                                    <item.icon className={`h-5 w-5 flex-shrink-0 relative z-10 ${isActive ? 'animate-bounce' : ''}`} />
                                    <span className="relative z-10">{item.name}</span>
                                    {isActive && (
                                        <div className="ml-auto w-2 h-2 rounded-full bg-white relative z-10" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Bottom navigation */}
                    <div className="border-t bg-muted/30 p-3 space-y-1">
                        <div className="px-3 mb-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Account
                            </p>
                        </div>
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

                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                text-destructive hover:bg-destructive/10
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                border border-destructive/20
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
