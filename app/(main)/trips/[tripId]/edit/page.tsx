'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ItineraryBuilder } from '@/components/trips/ItineraryBuilder'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EditTripPage() {
    const { tripId } = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [trip, setTrip] = useState<any>(null)
    const [sections, setSections] = useState<any[]>([])

    const [availableActivities, setAvailableActivities] = useState<any[]>([])

    useEffect(() => {
        async function loadTripData() {
            try {
                const [tripRes, sectionsRes] = await Promise.all([
                    fetch(`/api/trips/${tripId}`),
                    fetch(`/api/trips/${tripId}/sections`)
                ])

                const tripData = await tripRes.json()
                const sectionsData = await sectionsRes.json()

                if (tripData.trip) {
                    setTrip(tripData.trip)
                    // Fetch activities for this city
                    const activitiesRes = await fetch(`/api/activities?cityId=${tripData.trip.city_id}`)
                    const activitiesData = await activitiesRes.json()
                    setAvailableActivities(activitiesData.activities || [])
                }
                setSections(sectionsData.sections || [])
            } catch (error) {
                toast.error('Failed to load trip details')
            } finally {
                setIsLoading(false)
            }
        }
        loadTripData()
    }, [tripId])


    const handleSave = async (updatedSections: any[]) => {
        setIsSaving(true)
        try {
            const res = await fetch(`/api/trips/${tripId}/sections`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sections: updatedSections })
            })

            if (res.ok) {
                toast.success('Itinerary synchronized successfully!')
                router.push(`/trips/${tripId}`)
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error('Failed to sync itinerary')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-12">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-6 -ml-4 gap-2 text-muted-foreground hover:text-primary transition-colors font-bold"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Trip
                </Button>
                <h1 className="text-5xl font-black tracking-tight mb-4">
                    Architecting <span className="text-gradient">{trip?.title}</span>
                </h1>
                <p className="text-muted-foreground text-xl max-w-2xl">
                    Define the rhythm of your adventure. Organize days, allocate budgets, and curate experiences.
                </p>
            </div>

            <ItineraryBuilder
                initialSections={sections}
                availableActivities={availableActivities}
                onSave={handleSave}
                isLoading={isSaving}
            />

        </div>
    )
}
