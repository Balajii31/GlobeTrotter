import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface TripCardProps {
    trip: {
        id: string
        title: string
        start_date: string
        end_date: string
        status: string
        cities: {
            name: string
            country: string
            image_url: string
        }
    }
}

export function TripCard({ trip }: TripCardProps) {
    const statusColors: Record<string, string> = {
        planned: 'bg-blue-500/10 text-blue-500',
        completed: 'bg-green-500/10 text-green-500',
        cancelled: 'bg-destructive/10 text-destructive',
    }

    return (
        <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 w-full">
                <Image
                    src={trip.cities.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&fit=crop'}
                    alt={trip.cities.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                    <Badge className={`${statusColors[trip.status] || 'bg-muted'} border-none uppercase tracking-widest text-[10px]`}>
                        {trip.status}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-5">
                <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors font-bold">
                    {trip.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <MapPin className="h-4 w-4" />
                    <span>{trip.cities.name}, {trip.cities.country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Calendar className="h-4 w-4" />
                    <span>
                        {format(new Date(trip.start_date), 'MMM d')} - {format(new Date(trip.end_date), 'MMM d, yyyy')}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="px-5 py-4 bg-muted/30 border-t">
                <Link href={`/trips/${trip.id}`} className="w-full">
                    <Button variant="ghost" className="w-full justify-between group/btn text-primary font-bold hover:bg-primary/5">
                        View Itinerary
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
