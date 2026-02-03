import ActivityList from '@/components/activities/ActivityList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Expeditions - Globetrotter',
    description: 'Browse vintage travel activities',
}

export default function ActivitiesPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 border-b-4 border-black pb-4">
                <h1 className="text-5xl font-bold font-retro tracking-tighter uppercase text-black">
                    Expeditions
                </h1>
                <p className="text-retro-brown font-bold mt-2 uppercase tracking-wide">
                    Discover your next vintage adventure across the globe
                </p>
            </div>

            <ActivityList />
        </div>
    )
}
