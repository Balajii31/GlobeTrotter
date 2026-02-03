import { LoginForm } from '@/components/auth/LoginForm'
import { Globe } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login - Globetrotter',
    description: 'Sign in to your Globetrotter account',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
            <div className="w-full max-w-md space-y-6 sm:space-y-8">
                <Link href="/" className="flex items-center justify-center space-x-2 group">
                    <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-primary transition-transform group-hover:rotate-12" />
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Globetrotter
                    </span>
                </Link>
                <LoginForm />
            </div>
        </div>
    )
}
