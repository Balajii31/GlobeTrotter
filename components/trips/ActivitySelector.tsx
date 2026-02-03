'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, DollarSign, Plus, Check, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

interface Activity {
    id: string
    name: string
    description: string
    category: string
    image_url: string
    estimated_duration: string
    estimated_cost: number
}

interface ActivitySelectorProps {
    activities: Activity[]
    selectedActivities: string[]
    onToggleActivity: (activityId: string) => void
    onContinue: () => void
    isLoading?: boolean
}

export function ActivitySelector({
    activities,
    selectedActivities,
    onToggleActivity,
    onContinue,
    isLoading
}: ActivitySelectorProps) {
    const [search, setSearch] = useState('')

    const filteredActivities = activities.filter(activity =>
        activity.name.toLowerCase().includes(search.toLowerCase()) ||
        activity.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search activities..."
                        className="pl-10 h-11 rounded-xl"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-muted-foreground">
                        {selectedActivities.length} activities selected
                    </p>
                    <Button
                        onClick={onContinue}
                        disabled={selectedActivities.length === 0 || isLoading}
                        className="rounded-xl h-11 px-8 font-bold shadow-lg shadow-primary/20"
                    >
                        Review Itinerary
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => {
                    const isSelected = selectedActivities.includes(activity.id)
                    return (
                        <Card
                            key={activity.id}
                            className={`group overflow-hidden rounded-3xl border-2 transition-all duration-300 pointer-events-auto cursor-pointer ${isSelected ? 'border-primary shadow-lg ring-1 ring-primary' : 'border-transparent shadow-md hover:shadow-xl'
                                }`}
                            onClick={() => onToggleActivity(activity.id)}
                        >
                            <div className="relative h-48">
                                <Image
                                    src={activity.image_url || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&fit=crop'}
                                    alt={activity.name}
                                    fill
                                    className={`object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-white/90 text-black border-none font-bold backdrop-blur">
                                        {activity.category}
                                    </Badge>
                                </div>
                                {isSelected && (
                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                        <div className="bg-primary text-white p-2 rounded-full shadow-xl">
                                            <Check className="h-6 w-6" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-5 space-y-3">
                                <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">
                                    {activity.name}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                    {activity.description}
                                </p>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-primary" />
                                            {activity.estimated_duration}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <DollarSign className="h-3.5 w-3.5 text-primary" />
                                            {activity.estimated_cost}
                                        </div>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant={isSelected ? "default" : "outline"}
                                        className={`rounded-xl h-9 w-9 transition-all ${isSelected ? '' : 'hover:bg-primary/5 border-primary/20 text-primary'}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onToggleActivity(activity.id)
                                        }}
                                    >
                                        <Plus className={`h-4 w-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {filteredActivities.length === 0 && (
                <div className="text-center py-20 grayscale opacity-50">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">No activities found</h3>
                    <p className="text-muted-foreground">Try a different search term or category</p>
                </div>
            )}
        </div>
    )
}
