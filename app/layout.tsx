import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Globetrotter - Plan Your Perfect Journey',
    description: 'Discover, plan, and organize your dream travels with Globetrotter. Explore destinations, create detailed itineraries, and make unforgettable memories.',
    keywords: ['travel', 'trip planning', 'itinerary', 'destinations', 'vacation'],
    authors: [{ name: 'Globetrotter Team' }],
    openGraph: {
        title: 'Globetrotter - Plan Your Perfect Journey',
        description: 'Discover, plan, and organize your dream travels with Globetrotter.',
        type: 'website',
    },
}

import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    forcedTheme="light"
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <div className="flex h-screen flex-col overflow-hidden bg-background">
                            <Header />
                            <main className="flex-1 overflow-hidden">{children}</main>
                        </div>
                        <Toaster position="top-right" richColors />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
