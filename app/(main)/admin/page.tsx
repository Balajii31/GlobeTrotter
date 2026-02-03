import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Plane, Activity, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NextLink from 'next/link'
import type { Metadata } from 'next'
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard'

export const metadata: Metadata = {
    title: 'Admin Dashboard - Globetrotter',
    description: 'Manage users and view analytics',
}

export default function AdminDashboardPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <h1 className="text-5xl font-black tracking-tight mb-4">Command <span className="text-gradient">Center</span></h1>
                    <p className="text-muted-foreground text-xl max-w-2xl">
                        A real-time visual ecosystem of Globetrotter's growth and explorer engagement.
                    </p>
                </div>
                <div className="flex gap-4">
                    <NextLink href="/admin/users">
                        <Button className="rounded-2xl h-14 px-8 font-bold shadow-xl shadow-primary/20">
                            Traveler Directory
                        </Button>
                    </NextLink>
                </div>
            </div>

            <AnalyticsDashboard />
        </div>
    )
}
