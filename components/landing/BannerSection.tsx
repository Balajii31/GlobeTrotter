'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function BannerSection() {
    return (
        <section className="relative min-h-[600px] lg:min-h-[800px] flex items-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
                    alt="Travel destination"
                    fill
                    className="object-cover scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl space-y-8 animate-slide-up">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span>Discover the World with us</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight tracking-tight">
                        Your Next Adventure <br />
                        <span className="text-gradient">Starts Here</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
                        Explore breathtaking destinations, create personalized itineraries, and make every journey unforgettable with Globetrotter's intelligent travel planning.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/trips/new">
                            <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Plan Your Trip
                            </Button>
                        </Link>
                        <Link href="/cities">
                            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 text-lg font-bold transition-all">
                                Explore Destinations
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
