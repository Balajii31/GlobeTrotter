'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Calendar, MapPin, Loader2, Plane } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTrips } from '@/hooks/useTrips'
import { format } from 'date-fns'

export function TripHistory() {
    const { trips, loading } = useTrips()

    // Sort and filter only completed trips for history
    const completedTrips = trips.filter(t => t.status === 'completed')

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    )

    return (
        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white/60 backdrop-blur-md">
            <CardContent className="p-10">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-bold tracking-tight">Vaulted Journeys</h3>
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Plane className="h-5 w-5" />
                    </div>
                </div>

                {completedTrips.length === 0 ? (
                    <div className="text-center py-20 grayscale opacity-40">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h4 className="text-xl font-bold mb-2">History is Empty</h4>
                        <p className="text-muted-foreground max-w-xs mx-auto">
                            Your epic adventures wait to be written. Start planning your first escape!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {completedTrips.map((trip) => (
                            <Link
                                key={trip.id}
                                href={`/trips/${trip.id}`}
                                className="block group"
                            >
                                <div className="flex gap-6 p-6 rounded-[2rem] border-2 border-transparent hover:border-primary/20 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <div className="relative w-28 h-28 flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-lg">
                                        <Image
                                            src={trip.cities?.image_url || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop'}
                                            alt={trip.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="font-bold text-2xl mb-2 truncate group-hover:text-primary transition-colors">
                                            {trip.title}
                                        </h4>
                                        <div className="flex flex-wrap items-center gap-6">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                <span>{trip.cities?.name}, {trip.cities?.country}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                <span>
                                                    {format(new Date(trip.start_date), 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex items-center">
                                        <span className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600">
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
