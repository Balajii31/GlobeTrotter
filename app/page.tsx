import { BannerSection } from '@/components/landing/BannerSection'
import { RegionalSelections } from '@/components/landing/RegionalSelections'
import { CityGrid } from '@/components/landing/CityGrid'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="relative min-h-screen">
            {/* Hero Banner */}
            <BannerSection />

            {/* Content Sections */}
            <div className="space-y-0">
                <RegionalSelections />
                <CityGrid />
            </div>

            <Link
                href="/trips/new"
                className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40 group"
                aria-label="Plan a new trip"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                    <button className="relative bg-primary text-white p-4 sm:p-5 rounded-full shadow-xl shadow-primary/20 group-hover:scale-110 group-hover:rotate-90 transition-all active:scale-95">
                        <Plus className="h-6 w-6 sm:h-8 sm:h-8" />
                    </button>
                </div>
            </Link>
        </main>
    )
}
