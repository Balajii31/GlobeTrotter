'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { BannerSection } from '@/components/landing/BannerSection'
import { SearchBar } from '@/components/landing/SearchBar'
import { FilterBar } from '@/components/landing/FilterBar'
import { CityGrid } from '@/components/landing/CityGrid'
import { RegionalSelections } from '@/components/landing/RegionalSelections'
import { PreviousTrips } from '@/components/landing/PreviousTrips'
import { ItineraryBuilder } from '@/components/trips/ItineraryBuilder'
import { ActivitySelector } from '@/components/trips/ActivitySelector'
import { TripCard } from '@/components/trips/TripCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    LayoutDashboard,
    Plane,
    MapPin,
    Calendar,
    Bell,
    Search,
    Plus,
    TrendingUp,
    Map as MapIcon,
    Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function UnifiedUIPage() {
    const [activeTab, setActiveTab] = useState('explore')

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Fixed Sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Main Layout Container */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-[288px]"> {/* Sidebar width is 72 (288px) */}

                {/* Fixed Top Header (integrated into layout) */}
                <header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search destinations, trips, or activities..."
                                className="w-full bg-muted/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                        </Button>
                        <div className="h-8 w-[1px] bg-border mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold">User Account</p>
                                <p className="text-xs text-muted-foreground">Pro Explorer</p>
                            </div>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>GT</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Main Content Area - Scrollable */}
                <main className="flex-1 overflow-y-auto scrollbar-hide">
                    {/* Welcome Section */}
                    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Welcome back, Traveler
                                </h1>
                                <p className="text-muted-foreground mt-2 text-lg">
                                    Your next adventure is just a click away.
                                </p>
                            </div>
                            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 bg-primary text-white hover:scale-105 transition-all">
                                <Plus className="mr-2 h-5 w-5" />
                                Plan New Trip
                            </Button>
                        </div>

                        {/* Quick Stats / Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Upcoming Trips', value: '3', icon: Plane, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { label: 'Cities Visited', value: '12', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                { label: 'Activities Done', value: '48', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
                                { label: 'Travel Hours', value: '156k', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
                            ].map((stat, i) => (
                                <Card key={i} className="border-none shadow-premium hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Main Tabs for Unified View */}
                        <Tabs defaultValue="explore" className="w-full">
                            <TabsList className="bg-muted/50 p-1 rounded-full w-fit mb-8">
                                <TabsTrigger value="explore" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                                    Explore
                                </TabsTrigger>
                                <TabsTrigger value="trips" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                                    My Trips
                                </TabsTrigger>
                                <TabsTrigger value="planning" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                                    Itinerary Builder
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="explore" className="space-y-12">
                                <section>
                                    <SearchBar />
                                    <div className="mt-8 flex justify-center">
                                        <FilterBar />
                                    </div>
                                </section>

                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">Trending Regions</h2>
                                        <Button variant="link" className="text-primary font-semibold">View all</Button>
                                    </div>
                                    <RegionalSelections />
                                </section>

                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">Curated Destinations</h2>
                                        <Badge variant="outline" className="px-3 py-1 bg-primary/5 border-primary/20 text-primary">Top Picks</Badge>
                                    </div>
                                    <CityGrid />
                                </section>
                            </TabsContent>

                            <TabsContent value="trips" className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Mock Trip Cards or PreviousTrips component */}
                                    <PreviousTrips />
                                </div>
                            </TabsContent>

                            <TabsContent value="planning" className="space-y-8">
                                <Card className="border-none shadow-premium overflow-hidden">
                                    <CardHeader className="bg-gradient-to-r from-primary to-accent text-white p-8">
                                        <CardTitle className="text-3xl">Plan Your Itinerary</CardTitle>
                                        <p className="text-white/80">Build your dream schedule with ease</p>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="grid grid-cols-1 xl:grid-cols-3">
                                            <div className="xl:col-span-2 border-r p-6">
                                                <h3 className="font-bold flex items-center gap-2 mb-6">
                                                    <Calendar className="h-5 w-5 text-primary" />
                                                    Timeline
                                                </h3>
                                                <div className="bg-muted/30 rounded-2xl p-4 min-h-[400px]">
                                                    {/* Integration of ItineraryBuilder if available */}
                                                    <p className="text-center text-muted-foreground pt-20 italic">
                                                        Select activities to start building your timeline
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-muted/20">
                                                <h3 className="font-bold flex items-center gap-2 mb-6">
                                                    <MapPin className="h-5 w-5 text-primary" />
                                                    Available Activities
                                                </h3>
                                                {/* Integration of ActivitySelector */}
                                                <div className="space-y-4">
                                                    {[1, 2, 3].map((_, i) => (
                                                        <div key={i} className="flex items-center gap-4 bg-background p-3 rounded-xl border shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                                                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                                                <img src={`https://picsum.photos/seed/${i + 50}/100/100`} alt="activity" className="object-cover h-full w-full" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-sm">Museum of Art</p>
                                                                <p className="text-xs text-muted-foreground">Historical • 2h</p>
                                                            </div>
                                                            <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Footer Integrated */}
                    <footer className="mt-20 border-t bg-muted/30 py-10 px-6">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-primary text-white">
                                    <MapIcon className="h-5 w-5" />
                                </div>
                                <span className="font-bold text-lg">Globetrotter</span>
                            </div>
                            <p className="text-sm text-muted-foreground">© 2024 Globetrotter App. All rights reserved.</p>
                            <div className="flex items-center gap-6">
                                <Button variant="ghost" size="sm">Terms</Button>
                                <Button variant="ghost" size="sm">Privacy</Button>
                                <Button variant="ghost" size="sm">Cookies</Button>
                            </div>
                        </div>
                    </footer>
                </main>

                {/* Right Floating Quick Panel (Optional / Premium feel) */}
                <div className="hidden xl:flex fixed right-8 bottom-8 flex-col gap-4 z-40">
                    <Button size="icon" className="h-12 w-12 rounded-full shadow-2xl bg-white text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all">
                        <Plus className="h-6 w-6" />
                    </Button>
                    <Button size="icon" className="h-12 w-12 rounded-full shadow-2xl bg-white text-muted-foreground border hover:text-primary transition-all">
                        <MapIcon className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
