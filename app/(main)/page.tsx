import { BannerSection } from '@/components/landing/BannerSection'
import { SearchBar } from '@/components/landing/SearchBar'
import { FilterBar } from '@/components/landing/FilterBar'
import { RegionalSelections } from '@/components/landing/RegionalSelections'
import { CityGrid } from '@/components/landing/CityGrid'
import { PreviousTrips } from '@/components/landing/PreviousTrips'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
    return (
        <>
            {/* Hero Banner */}
            <BannerSection />

            {/* Search and Filters Section */}
            <section className="py-8 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <SearchBar />
                        <div className="flex justify-center">
                            <FilterBar />
                        </div>
                    </div>
                </div>
            </section>

            {/* Regional Selections */}
            <RegionalSelections />

            {/* Featured Cities */}
            <CityGrid />

            {/* Previous Trips (shown if user is logged in) */}
            <PreviousTrips />

            {/* Floating Action Button */}
            <Link
                href="/trips/new"
                className="fixed bottom-8 right-8 z-40 group"
                aria-label="Plan a new trip"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all" />
                    <button className="relative bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-2xl hover:shadow-primary/50 transition-all hover:scale-110 active:scale-95">
                        <Plus className="h-6 w-6" />
                    </button>
                </div>
            </Link>
        </>
    )
}
