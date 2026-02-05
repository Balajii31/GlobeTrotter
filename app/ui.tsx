'use client'

import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { BannerSection } from '@/components/landing/BannerSection'
import { SearchBar } from '@/components/landing/SearchBar'
import { FilterBar } from '@/components/landing/FilterBar'
import { CityGrid } from '@/components/landing/CityGrid'
import { RegionalSelections } from '@/components/landing/RegionalSelections'
import { PreviousTrips } from '@/components/landing/PreviousTrips'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

/**
 * Unified UI Component
 * This component provides a fixed layout where all main app components
 * are integrated into a single, cohesive interface.
 */
export default function AppUI() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* 1. Fixed Sidebar - Handles navigation */}
            <Sidebar />

            {/* 2. Main Content Wrapper - Fixed width adjustment for sidebar */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-[280px]"> {/* Adjusted for Sidebar width */}

                {/* 4. Scrollable Content Area - This is the only part that scrolls */}
                <main className="flex-1 overflow-y-auto relative scroll-smooth bg-muted/5">

                    {/* Hero Section */}
                    <div className="relative">
                        <BannerSection />
                    </div>

                    {/* Search & Discovery Section */}
                    <section className="py-12 bg-background relative z-10 -mt-20 px-4 sm:px-6 lg:px-8">
                        <div className="container mx-auto">
                            <div className="max-w-4xl mx-auto space-y-8 bg-card p-8 rounded-3xl shadow-premium border border-border/50 backdrop-blur-xl">
                                <div className="space-y-2 text-center">
                                    <h2 className="text-3xl font-bold tracking-tight">Where to next?</h2>
                                    <p className="text-muted-foreground">Search through 500+ destinations worldwide</p>
                                </div>
                                <SearchBar />
                                <div className="flex justify-center">
                                    <FilterBar />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Regional Discovery */}
                    <div className="px-4 sm:px-6 lg:px-8 py-12">
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Explore by Region</h2>
                                <Button variant="ghost" className="text-primary hover:text-primary/80">View Map</Button>
                            </div>
                            <RegionalSelections />
                        </div>
                    </div>

                    {/* Featured Destinations */}
                    <div className="px-4 sm:px-6 lg:px-8 py-12 bg-muted/20">
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold">Popular Destinations</h2>
                                    <p className="text-sm text-muted-foreground">Most saved by other travelers this week</p>
                                </div>
                                <Button variant="outline" className="rounded-full">See All</Button>
                            </div>
                            <CityGrid />
                        </div>
                    </div>

                    {/* Personal Trips Section */}
                    <div className="px-4 sm:px-6 lg:px-8 py-12">
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Your Recent Adventures</h2>
                                <Link href="/trips">
                                    <Button variant="link" className="text-primary">See All Trips →</Button>
                                </Link>
                            </div>
                            <PreviousTrips />
                        </div>
                    </div>

                    {/* Floating Action Button - Fixed relative to the scrollable main area or the screen */}
                    <div className="fixed bottom-8 right-8 z-50">
                        <Link href="/trips/new">
                            <Button className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-accent text-white hover:scale-110 active:scale-95 transition-all">
                                <Plus className="h-6 w-6" />
                            </Button>
                        </Link>
                    </div>

                    {/* Simple Bottom Spacing */}
                    <div className="h-20" />
                </main>
            </div>
        </div>
    )
}
