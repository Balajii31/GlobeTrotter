import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const regions = [
    {
        id: 1,
        name: 'Europe',
        description: 'Historic cities and stunning landscapes',
        icon: '🇪🇺',
        count: 24,
    },
    {
        id: 2,
        name: 'Asia',
        description: 'Rich culture and exotic destinations',
        icon: '🌏',
        count: 32,
    },
    {
        id: 3,
        name: 'Americas',
        description: 'Diverse landscapes from north to south',
        icon: '🌎',
        count: 18,
    },
    {
        id: 4,
        name: 'Africa',
        description: 'Wildlife safaris and natural wonders',
        icon: '🌍',
        count: 15,
    },
    {
        id: 5,
        name: 'Oceania',
        description: 'Pacific islands and beaches',
        icon: '🏝️',
        count: 12,
    },
]

export function RegionalSelections() {
    return (
        <section className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 sm:mb-24 animate-slide-up">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Explore by <span className="text-gradient">Region</span>
                    </h2>
                    <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
                        Whether you're looking for historic charm, tropical bliss, or modern marvels, find your perfect escape by continent.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {regions.map((region, index) => (
                        <Link key={region.id} href={`/?region=${region.name.toLowerCase()}`}>
                            <Card
                                className="group hover:shadow-2xl transition-all duration-500 hover-scale animate-fade-in h-auto rounded-[2.5rem] border-none bg-background/50 backdrop-blur-sm"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-8 sm:p-10 text-center space-y-4">
                                    <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                                        {region.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-xl sm:text-2xl tracking-tight">{region.name}</h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-semibold pt-1">
                                            {region.count} Destinations
                                        </p>
                                    </div>
                                    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
