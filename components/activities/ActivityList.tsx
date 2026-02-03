'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Loader2, Plus, Clock, DollarSign, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

interface Activity {
    id: string
    name: string
    description: string
    category: string
    image_url: string
    estimated_duration: string
    estimated_cost: number
    city: {
        name: string
    }
}

interface Trip {
    id: string
    title: string
}

export default function ActivityList() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [userTrips, setUserTrips] = useState<Trip[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
    const [isAddingToTrip, setIsAddingToTrip] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        async function loadData() {
            try {
                const [actRes, tripsRes] = await Promise.all([
                    fetch('/api/activities'),
                    supabase.from('trips').select('id, title').eq('status', 'planned')
                ])

                const actData = await actRes.json()
                setActivities(actData.activities || [])
                setUserTrips(tripsRes.data || [])
            } catch (error) {
                console.error('Error loading activities:', error)
                toast.error('Failed to load activities')
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [supabase])

    const handleAddToTrip = async (tripId: string) => {
        if (!selectedActivity) return
        setIsAddingToTrip(true)

        try {
            // Finding a section to add the activity to (or create one)
            const { data: sections, error: secError } = await supabase
                .from('trip_sections')
                .select('id')
                .eq('trip_id', tripId)
                .order('order_index', { ascending: true })
                .limit(1)

            let sectionId = sections?.[0]?.id

            if (!sectionId) {
                const { data: newSec, error: newSecError } = await supabase
                    .from('trip_sections')
                    .insert({ trip_id: tripId, title: 'Day 1', order_index: 0 })
                    .select()
                    .single()

                if (newSecError) throw newSecError
                sectionId = newSec.id
            }

            const { error: addError } = await supabase
                .from('trip_activities')
                .insert({
                    trip_section_id: sectionId,
                    activity_id: selectedActivity.id,
                })

            if (addError) throw addError

            toast.success(`Added ${selectedActivity.name} to trip!`)
            setSelectedActivity(null)
        } catch (error: any) {
            toast.error(error.message || 'Failed to add activity')
        } finally {
            setIsAddingToTrip(false)
        }
    }

    const filteredActivities = activities.filter(activity =>
        activity.name.toLowerCase().includes(search.toLowerCase()) ||
        activity.category.toLowerCase().includes(search.toLowerCase()) ||
        activity.city.name.toLowerCase().includes(search.toLowerCase())
    )

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground font-medium">Loading amazing activities...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search activities, cities, categories..."
                        className="pl-10 h-12 rounded-xl border-muted focus:ring-primary/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredActivities.map((activity) => (
                    <Card key={activity.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col rounded-2xl">
                        <div className="relative h-56">
                            <Image
                                src={activity.image_url || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800'}
                                alt={activity.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                    {activity.category}
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                                <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                                    {activity.name}
                                </h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {activity.city.name}
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                                {activity.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-muted">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center text-xs text-muted-foreground font-medium">
                                        <Clock className="h-3.5 w-3.5 mr-1 text-primary" />
                                        {activity.estimated_duration}
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground font-medium">
                                        <DollarSign className="h-3.5 w-3.5 mr-1 text-accent" />
                                        {activity.estimated_cost}
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => setSelectedActivity(activity)}
                                    className="rounded-full font-bold bg-primary text-white hover:bg-primary/90"
                                >
                                    Add to Trip
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Selection Modal */}
            {selectedActivity && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <Card className="p-8 w-full max-w-md shadow-2xl animate-slide-up rounded-3xl border-none">
                        <CardTitle className="text-2xl font-bold mb-2">Select a Trip</CardTitle>
                        <p className="text-muted-foreground mb-6">Add <strong>{selectedActivity.name}</strong> to one of your planned trips.</p>

                        <div className="space-y-3 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {userTrips.length > 0 ? (
                                userTrips.map(trip => (
                                    <button
                                        key={trip.id}
                                        onClick={() => handleAddToTrip(trip.id)}
                                        disabled={isAddingToTrip}
                                        className="w-full p-4 rounded-xl border border-muted text-left font-bold hover:border-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
                                    >
                                        {trip.title}
                                        <Plus className="h-5 w-5 text-primary group-hover:rotate-90 transition-transform" />
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-8 bg-muted/50 rounded-xl border-2 border-dashed border-muted">
                                    <p className="text-sm font-medium text-muted-foreground">No planned trips found.</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedActivity(null)}
                                className="flex-1 rounded-xl"
                            >
                                Cancel
                            </Button>
                            {userTrips.length === 0 && (
                                <Button
                                    asChild
                                    className="flex-1 rounded-xl bg-primary"
                                >
                                    <Link href="/trips/new">Plan a Trip</Link>
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>
            )}

            {filteredActivities.length === 0 && (
                <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted">
                    <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="text-xl font-bold">No results found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms.</p>
                </div>
            )}
        </div>
    )
}
