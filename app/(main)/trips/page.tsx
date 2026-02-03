'use client'

import { Plus, Loader2, Plane, Compass } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTrips } from '@/hooks/useTrips'
import { TripCard } from '@/components/trips/TripCard'
import { useState } from 'react'

export default function TripsPage() {
    const { trips, loading } = useTrips()
    const [filter, setFilter] = useState<'all' | 'planned' | 'completed'>('all')

    const filteredTrips = trips.filter(trip =>
        filter === 'all' ? true : trip.status === filter
    )

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-5xl font-black tracking-tight mb-4">My <span className="text-gradient">Journeys</span></h1>
                    <p className="text-muted-foreground text-xl max-w-2xl">
                        Manage your upcoming escapes and relive your vaulted memories in one premium dashboard.
                    </p>
                </div>
                <Link href="/trips/new">
                    <Button size="lg" className="rounded-2xl h-16 px-8 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                        <Plus className="mr-2 h-6 w-6" />
                        Plan New Journey
                    </Button>
                </Link>
            </div>

            {trips.length === 0 ? (
                <Card className="border-none shadow-2xl rounded-[3rem] p-20 text-center bg-white/60 backdrop-blur-xl animate-fade-in">
                    <div className="max-w-md mx-auto space-y-8">
                        <div className="relative inline-block">
                            <Compass className="h-24 w-24 text-primary animate-pulse" />
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black mb-4">No Journeys Recorded</h2>
                            <p className="text-muted-foreground text-lg">
                                The world is a book and those who do not travel read only one page. Let's start your first chapter.
                            </p>
                        </div>
                        <Link href="/trips/new" className="inline-block">
                            <Button size="lg" className="rounded-2xl h-14 px-10 font-bold shadow-lg">
                                Create Your First Trip
                            </Button>
                        </Link>
                    </div>
                </Card>
            ) : (
                <div className="space-y-12">
                    {/* Premium Filter Tabs */}
                    <div className="flex gap-4 p-2 bg-muted/20 rounded-2xl w-fit backdrop-blur">
                        {['all', 'planned', 'completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-8 py-3 rounded-xl font-bold transition-all ${filter === f
                                        ? 'bg-white text-primary shadow-sm scale-105'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Trips Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredTrips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>

                    {filteredTrips.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-xl font-medium">No {filter} trips found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
