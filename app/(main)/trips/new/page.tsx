import { CreateTripForm } from '@/components/trips/CreateTripForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Create Trip - Globetrotter',
    description: 'Plan your next adventure',
}

export default function NewTripPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Plan Your Trip</h1>
                <p className="text-muted-foreground">
                    Create a new trip by selecting your destination and dates
                </p>
            </div>

            <CreateTripForm />
        </div>
    )
}
