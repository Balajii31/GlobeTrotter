'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Sun, Snowflake, Leaf, Flower2, ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { City } from '@/lib/types'

const SEASON_ICONS: Record<string, any> = {
    'Summer': <Sun className="h-4 w-4 text-orange-500" />,
    'Winter': <Snowflake className="h-4 w-4 text-blue-500" />,
    'Spring': <Flower2 className="h-4 w-4 text-pink-500" />,
    'Autumn': <Leaf className="h-4 w-4 text-amber-600" />,
}

export function CityExploration() {
    const [cities, setCities] = useState<City[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeSeason, setActiveSeason] = useState<string>('All')

    useEffect(() => {
        async function fetchCities() {
            try {
                const res = await fetch('/api/cities')
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

    const seasons = ['All', 'Spring', 'Summer', 'Autumn', 'Winter']

    const filteredCities = activeSeason === 'All'
        ? cities
        : cities.filter(c => c.seasonal_tag === activeSeason)

    if (isLoading) return <div className="animate-pulse h-64 bg-muted rounded-3xl" />

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Exploration Hub</h2>
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                        Targeted recommendations based on seasonal peak performance
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {seasons.map(season => (
                        <button
                            key={season}
                            onClick={() => setActiveSeason(season)}
                            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeSeason === season
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            {season}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCities.map((city) => (
                    <Link href={`#`} key={city.id} className="group">
                        <Card className="overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-background hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={city.image_url || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'}
                                    alt={city.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-white/90 text-black border-none font-black backdrop-blur-md uppercase tracking-tighter italic">
                                        {city.popularity_score}% MATCH
                                    </Badge>
                                </div>
                                <div className="absolute bottom-4 left-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge className="bg-primary/20 text-white border-primary/20 backdrop-blur-md uppercase text-[8px] font-black tracking-widest">
                                            {city.region}
                                        </Badge>
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{city.name}</h3>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-muted rounded-xl">
                                                {city.seasonal_tag && SEASON_ICONS[city.seasonal_tag] || <Calendar className="h-4 w-4 text-primary" />}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Peak Season</p>
                                                <p className="text-sm font-bold uppercase italic">{city.seasonal_tag || 'Year Round'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Best Time</p>
                                            <p className="text-sm font-bold uppercase italic">{city.best_time_to_visit || 'Anytime'}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-muted flex items-center justify-between group/btn">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Deploy Expedition</span>
                                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover/btn:translate-x-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {filteredCities.length === 0 && (
                <div className="text-center py-20 border-4 border-dashed border-muted rounded-[3rem]">
                    <p className="font-black text-muted-foreground uppercase tracking-widest text-sm">No data matching current seasonal parameters</p>
                </div>
            )}
        </div>
    )
}
