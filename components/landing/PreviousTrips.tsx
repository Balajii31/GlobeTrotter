'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTrips } from '@/hooks/useTrips'
import { useAuth } from '@/hooks/useAuth'
import { format } from 'date-fns'

export function PreviousTrips() {
    const { user } = useAuth()
    const { trips, loading } = useTrips()

    if (!user || (!loading && trips.length === 0)) return null

    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 animate-slide-up">
                    <div className="max-w-xl">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                            Your <span className="text-gradient">Travel Memory</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Relive your past adventures and keep track of all the amazing places you've explored.
                        </p>
                    </div>
                    <Link href="/trips">
                        <Button variant="ghost" className="hidden sm:flex items-center gap-2 hover:bg-primary/5 text-primary font-bold">
                            View All Memories
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {trips.slice(0, 3).map((trip, index) => (
                            <Card
                                key={trip.id}
                                className="group h-[380px] sm:h-[420px] rounded-[2rem] overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative h-full w-full">
                                    <Image
                                        src={trip.cities?.image_url || 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop'}
                                        alt={trip.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                    <CardContent className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full glass border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                                            {format(new Date(trip.start_date), 'MMMM yyyy')}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-2xl text-white tracking-tight group-hover:text-primary transition-colors">{trip.title}</h3>
                                            <div className="flex items-center gap-2 text-white/60 text-sm mt-2 font-medium">
                                                <MapPin className="h-4 w-4" />
                                                <span>{trip.cities?.name}, {trip.cities?.country}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="mt-10 sm:hidden">
                    <Link href="/trips">
                        <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold border-primary/20">
                            View All Memories
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
