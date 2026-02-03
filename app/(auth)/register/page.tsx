import { RegisterForm } from '@/components/auth/RegisterForm'
import { Globe } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Register - Globetrotter',
    description: 'Create your Globetrotter account',
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
            <div className="w-full max-w-md space-y-8">
                <Link href="/" className="flex items-center justify-center space-x-2 group">
                    <Globe className="h-10 w-10 text-primary transition-transform group-hover:rotate-12" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Globetrotter
                    </span>
                </Link>
                <RegisterForm />
            </div>
        </div>
    )
}
