'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, ArrowRight, Calendar, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { City } from '@/lib/types'

export function CityGrid() {
    const [cities, setCities] = useState<City[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchCities() {
            try {
                const res = await fetch('/api/cities?featured=true')
                const data = await res.json()
                setCities(data.cities || [])
            } catch (error) {
                console.error('Failed to fetch cities:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])

    if (isLoading) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )

    return (
        <section id="destinations" className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 animate-slide-up">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                            Featured <span className="text-gradient">Destinations</span>
                        </h2>
                        <p className="text-muted-foreground text-lg sm:text-xl">
                            Curated cities that offer unique experiences, vibrant cultures, and breathtaking landscapes for your next adventure.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-20">
                    {cities.map((city, index) => (
                        <Card
                            key={city.id}
                            className="group h-[500px] rounded-[2.5rem] overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    src={city.image_url || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'}
                                    alt={city.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                                    <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-black text-white">{city.popularity_score}%</span>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-white text-[10px] font-black uppercase tracking-widest">
                                        {city.seasonal_tag || 'Year Round'}
                                    </div>
                                </div>

                                <CardContent className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-widest">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span>{city.country}</span>
                                        </div>
                                        <h3 className="font-black text-3xl text-white uppercase italic tracking-tighter">{city.name}</h3>
                                    </div>

                                    <div className="flex items-center gap-2 text-primary-foreground/80 text-xs font-bold bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10 group-hover:bg-primary transition-colors">
                                        <Calendar className="h-4 w-4" />
                                        <div className="flex-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1 opacity-60">Peak Window</p>
                                            <p className="uppercase">{city.best_time_to_visit || 'Anytime'}</p>
                                        </div>
                                    </div>

                                    <Link href={`/trips/new?cityId=${city.id}`} className="block">
                                        <Button className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-bold transition-all shadow-xl uppercase tracking-widest text-xs">
                                            PLAN EXPEDITION
                                        </Button>
                                    </Link>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/cities">
                        <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-primary/20 hover:border-primary transition-all text-lg font-black uppercase tracking-tighter italic group">
                            BROWS ALL HUBS
                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

