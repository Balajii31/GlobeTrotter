'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Plane, Activity, TrendingUp, Loader2, ArrowUpRight, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export function AnalyticsDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/analytics')
                if (!res.ok) {
                    const errorData = await res.json()
                    throw new Error(errorData.error || 'Failed to fetch analytics')
                }
                const data = await res.json()
                setStats(data)
                setError(null)
            } catch (err: any) {
                console.error('Analytics Error:', err)
                setError(err.message || 'Failed to load analytics')
                toast.error('Failed to load analytics data')
            } finally {
                setIsLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (isLoading) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    )

    if (error) return (
        <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-10 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Unable to Load Analytics</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
            </CardContent>
        </Card>
    )

    const cards = [
        { title: 'Global Explorers', value: stats?.totalUsers, icon: Users, trend: stats?.trends?.users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Journeys Planned', value: stats?.totalTrips, icon: Plane, trend: stats?.trends?.trips, color: 'text-accent', bg: 'bg-accent/10' },
        { title: 'Active Today', value: stats?.activeUsers, icon: Activity, trend: stats?.trends?.active, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { title: 'New This Month', value: stats?.newTripsMonth, icon: TrendingUp, trend: stats?.trends?.monthly, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ]

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <Card key={idx} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                        <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`p-4 ${card.bg} rounded-2xl transition-transform group-hover:scale-110`}>
                                    <card.icon className={`h-7 w-7 ${card.color}`} />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="h-3 w-3" />
                                    {card.trend}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{card.title}</p>
                                <p className="text-4xl font-black tracking-tight">{card.value?.toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Popular Cities Graph Mockups */}
                <Card className="border-none shadow-2xl rounded-[3rem] p-10">
                    <CardTitle className="text-2xl mb-8">Trending Destinations</CardTitle>
                    <div className="space-y-6">
                        {[
                            { name: 'Santorini', country: 'Greece', value: 85, color: 'bg-blue-500' },
                            { name: 'Kyoto', country: 'Japan', value: 72, color: 'bg-accent' },
                            { name: 'Paris', country: 'France', value: 64, color: 'bg-emerald-500' },
                            { name: 'Zurich', country: 'Switzerland', value: 48, color: 'bg-purple-500' }
                        ].map((city, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span>{city.name}, <span className="text-muted-foreground font-medium">{city.country}</span></span>
                                    <span className="text-primary">{city.value}%</span>
                                </div>
                                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${city.color} transition-all duration-1000 ease-out`}
                                        style={{ width: `${city.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="border-none shadow-2xl rounded-[3rem] p-10">
                    <CardTitle className="text-2xl mb-8">Platform Momentum</CardTitle>
                    <div className="flex items-end justify-between h-48 gap-3 pt-6">
                        {[40, 65, 45, 90, 55, 75, 85].map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                                <div className="relative w-full">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-xl transition-all duration-700 group-hover/bar:bg-primary/40"
                                        style={{ height: `${val}%` }}
                                    />
                                    <div
                                        className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-1000 origin-bottom scale-y-0"
                                        style={{ height: `${val}%`, transform: 'scaleY(1)' }}
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground">DAY {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
