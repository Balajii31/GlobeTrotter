'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, DollarSign, Edit, Trash2, Plus, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function TripDetailsPage() {
    const { tripId } = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [trip, setTrip] = useState<any>(null)

    useEffect(() => {
        async function loadTrip() {
            try {
                const res = await fetch(`/api/trips/${tripId}`)
                const data = await res.json()
                if (data.trip) {
                    setTrip(data.trip)
                } else {
                    toast.error('Trip not found')
                    router.push('/dashboard')
                }
            } catch (error) {
                toast.error('Failed to load trip details')
            } finally {
                setIsLoading(false)
            }
        }
        loadTrip()
    }, [tripId, router])

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this trip?')) return

        try {
            const res = await fetch(`/api/trips/${tripId}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('Trip deleted successfully')
                router.push('/dashboard')
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error('Failed to delete trip')
        }
    }

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )

    if (!trip) return null

    const startDate = new Date(trip.start_date)
    const endDate = new Date(trip.end_date)
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalActivities = trip.sections?.reduce((acc: number, section: any) => acc + (section.activities?.length || 0), 0) || 0

    return (
        <div className="min-h-screen pb-12">
            {/* Hero Image */}
            <div className="relative h-96 w-full">
                <Image
                    src={trip.city?.image_url || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200'}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Trip Header */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                                    {trip.status} expedition
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic">{trip.title}</h1>
                                <div className="flex flex-wrap items-center gap-6 text-lg font-bold text-muted-foreground uppercase">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <span>{trip.city?.name}, {trip.city?.country}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        <span>
                                            {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            {' - '}
                                            {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href={`/trips/${trip.id}/edit`}>
                                    <Button size="lg" className="rounded-xl font-bold h-12 shadow-lg shadow-primary/20 gap-2">
                                        <Edit className="h-4 w-4" />
                                        ARCHITECT ITINERARY
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="rounded-xl font-bold h-12 border-destructive/20 text-destructive hover:bg-destructive/5 gap-2" onClick={handleDelete}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trip Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Trip Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <Card className="border-none shadow-xl rounded-[2rem] bg-muted/30">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="p-4 bg-primary/10 rounded-2xl">
                                <Calendar className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Duration</p>
                                <p className="text-3xl font-black italic">{duration} DAYS</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[2rem] bg-muted/30">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="p-4 bg-accent/10 rounded-2xl">
                                <DollarSign className="h-8 w-8 text-accent" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Budget</p>
                                <p className="text-3xl font-black italic">${trip.total_budget || '0'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[2rem] bg-muted/30">
                        <CardContent className="p-8 flex items-center gap-6">
                            <div className="p-4 bg-green-500/10 rounded-2xl">
                                <MapPin className="h-8 w-8 text-green-500" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Activities</p>
                                <p className="text-3xl font-black italic">{totalActivities}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Itinerary */}
                <div className="space-y-10">
                    <div className="flex justify-between items-center border-b-4 border-primary pb-6">
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter">Expedition Log</h2>
                        <Link href={`/trips/${trip.id}/edit`}>
                            <Button variant="outline" className="rounded-xl font-bold border-primary text-primary hover:bg-primary/5 uppercase tracking-widest text-xs">
                                <Plus className="h-3.5 w-3.5 mr-2" />
                                Add Section
                            </Button>
                        </Link>
                    </div>

                    {trip.sections?.map((section: any, index: number) => (
                        <Card key={section.id} className="overflow-hidden border-none shadow-2xl rounded-[3rem]">
                            <CardHeader className="bg-primary/5 p-8 border-b border-primary/10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl font-black uppercase italic">{section.title}</CardTitle>
                                        <CardDescription className="mt-3 flex flex-wrap items-center gap-6 font-bold uppercase">
                                            <span className="flex items-center gap-2 text-primary">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(section.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                {' - '}
                                                {new Date(section.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                            {section.budget > 0 && (
                                                <span className="flex items-center gap-2 text-primary">
                                                    <DollarSign className="h-4 w-4" />
                                                    ${section.budget} Allocation
                                                </span>
                                            )}
                                        </CardDescription>
                                    </div>
                                    <Link href={`/trips/${trip.id}/edit`}>
                                        <Button variant="ghost" size="sm" className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground hover:text-primary">
                                            Modify
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                {!section.activities || section.activities.length === 0 ? (
                                    <div className="text-center py-12 bg-muted/10 rounded-[2rem] border-2 border-dashed border-muted">
                                        <p className="font-bold text-muted-foreground uppercase tracking-widest text-sm mb-4">No objectives identified</p>
                                        <Link href={`/trips/${trip.id}/edit`}>
                                            <Button size="sm" className="rounded-xl font-bold">ADD ACTIVITY</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {section.activities.map((actWrap: any, actIdx: number) => {
                                            const activity = actWrap.activity;
                                            return (
                                                <div
                                                    key={actWrap.id}
                                                    className="flex items-start gap-6 p-6 rounded-3xl bg-background border-2 border-transparent hover:border-primary/20 transition-all hover:shadow-xl group"
                                                >
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl italic group-hover:scale-110 transition-transform">
                                                        {actIdx + 1}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <h4 className="text-xl font-black uppercase leading-tight">{activity?.name || 'Unknown Activity'}</h4>
                                                        <p className="text-sm text-muted-foreground font-medium line-clamp-2">
                                                            {activity?.description}
                                                        </p>
                                                        <div className="flex gap-4 pt-2">
                                                            <div className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                                ⏱️ {activity?.estimated_duration || 'N/A'}
                                                            </div>
                                                            <div className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                                💵 ${activity?.estimated_cost || '0'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {(!trip.sections || trip.sections.length === 0) && (
                        <Card className="p-20 text-center border-4 border-dashed border-muted rounded-[4rem]">
                            <div className="max-w-md mx-auto space-y-6">
                                <div className="text-8xl animate-bounce">📋</div>
                                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Empty Manifest</h3>
                                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">
                                    No itinerary data found. Initialize the architect to begin planning your expedition.
                                </p>
                                <Link href={`/trips/${trip.id}/edit`}>
                                    <Button size="lg" className="mt-8 rounded-2xl font-black h-16 w-full text-xl uppercase tracking-tighter italic">
                                        <Plus className="mr-3 h-6 w-6" />
                                        ARCHITECT EXPEDITION
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

