'use client'

import Link from 'next/link'
import { User, LogOut, LogIn, Sun, Moon, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/icons/Logo'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from 'next-themes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
    const { user, signOut } = useAuth()

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg group-hover:scale-110 transition-transform">
                            <Logo className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Globetrotter
                        </span>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            // Authenticated state
                            <>
                                <Link href="/trips/new">
                                    <Button className="h-10 px-6 rounded-full font-bold bg-primary text-white shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all">
                                        Plan Trip
                                    </Button>
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted font-bold">
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-premium border-muted">
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-lg font-medium py-2 px-3">
                                            <Link href="/profile" className="flex items-center">
                                                <User className="h-4 w-4 mr-3 text-muted-foreground" />
                                                My Account
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-lg font-medium py-2 px-3">
                                            <Link href="/dashboard" className="flex items-center">
                                                <Laptop className="h-4 w-4 mr-3 text-muted-foreground" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="my-1 opacity-50" />
                                        <DropdownMenuItem onClick={signOut} className="cursor-pointer rounded-lg font-medium py-2 px-3 text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center">
                                            <LogOut className="h-4 w-4 mr-3" />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            // Not authenticated state
                            <div className="flex items-center space-x-3">
                                <Link href="/login">
                                    <Button variant="ghost" className="font-bold hover:bg-muted text-foreground px-4 py-2 rounded-full">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="font-bold bg-primary text-white px-6 py-2 rounded-full shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
