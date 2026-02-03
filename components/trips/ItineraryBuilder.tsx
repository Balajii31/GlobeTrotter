'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, GripVertical, Trash2, Calendar, DollarSign, ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface TripSection {
    id: string
    title: string
    start_date: string
    end_date: string
    budget: number
    activities: {
        id: string
        name: string
        notes?: string
    }[]
}

interface ItineraryBuilderProps {
    initialSections?: TripSection[]
    availableActivities?: any[]
    onSave: (sections: TripSection[]) => void
    isLoading?: boolean
}

export function ItineraryBuilder({ initialSections = [], availableActivities = [], onSave, isLoading }: ItineraryBuilderProps) {
    const [sections, setSections] = useState<TripSection[]>(initialSections)
    const [expandedSections, setExpandedSections] = useState<string[]>(
        initialSections.map(s => s.id)
    )

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const addSection = () => {
        const newSection: TripSection = {
            id: Math.random().toString(36).substr(2, 9),
            title: `New Day Section`,
            start_date: format(new Date(), 'yyyy-MM-dd'),
            end_date: format(new Date(), 'yyyy-MM-dd'),
            budget: 0,
            activities: []
        }
        setSections([...sections, newSection])
        setExpandedSections([...expandedSections, newSection.id])
    }

    const updateSection = (id: string, updates: Partial<TripSection>) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
    }

    const addActivityToSection = (sectionId: string, activity: any) => {
        setSections(prev => prev.map(s => {
            if (s.id === sectionId) {
                // Avoid duplicates in the same section if you want, but maybe user wants to go twice?
                // Let's allow unique IDs for the activity instances in the section
                return {
                    ...s,
                    activities: [...s.activities, {
                        id: activity.id,
                        name: activity.name,
                        notes: ''
                    }]
                }
            }
            return s
        }))
    }

    const removeSection = (id: string) => {
        setSections(prev => prev.filter(s => s.id !== id))
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Your Itinerary</h2>
                    <p className="text-muted-foreground">Organize your activities into daily sections</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={addSection} className="rounded-xl font-bold h-11">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                    </Button>
                    <Button
                        onClick={() => onSave(sections)}
                        disabled={isLoading}
                        className="rounded-xl font-bold h-11 px-8 shadow-lg shadow-primary/20"
                    >
                        Save Itinerary
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {sections.map((section, index) => (
                    <Card key={section.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all rounded-3xl group">
                        <div
                            className={`flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors ${expandedSections.includes(section.id) ? 'bg-muted/20' : ''
                                }`}
                            onClick={() => toggleSection(section.id)}
                        >
                            <div className="flex items-center gap-4">
                                <GripVertical className="h-5 w-5 text-muted-foreground/30 cursor-grab active:cursor-grabbing" />
                                <div>
                                    <h3 className="font-bold text-lg">{section.title}</h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-1">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {format(new Date(section.start_date), 'MMM d')} - {format(new Date(section.end_date), 'MMM d')}
                                        </div>
                                        {section.budget > 0 && (
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="h-3.5 w-3.5" />
                                                Budget: ${section.budget}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-9 w-9 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeSection(section.id)
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                {expandedSections.includes(section.id) ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </div>
                        </div>

                        {expandedSections.includes(section.id) && (
                            <CardContent className="p-8 pt-2 space-y-6 border-t bg-muted/5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Section Title</Label>
                                        <Input
                                            value={section.title}
                                            onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                            className="h-11 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                value={section.budget}
                                                onChange={(e) => updateSection(section.id, { budget: parseFloat(e.target.value) || 0 })}
                                                className="h-11 rounded-xl pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dates</Label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="date"
                                                value={section.start_date}
                                                onChange={(e) => updateSection(section.id, { start_date: e.target.value })}
                                                className="h-11 rounded-xl"
                                            />
                                            <span className="text-muted-foreground">-</span>
                                            <Input
                                                type="date"
                                                value={section.end_date}
                                                onChange={(e) => updateSection(section.id, { end_date: e.target.value })}
                                                className="h-11 rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Activities</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary hover:text-primary hover:bg-primary/10">
                                                    <Plus className="h-3.5 w-3.5" />
                                                    Add Activity
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
                                                <DropdownMenuLabel className="font-bold">Select Activity</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <div className="max-h-60 overflow-y-auto">
                                                    {availableActivities.length === 0 ? (
                                                        <div className="p-4 text-center text-xs text-muted-foreground">
                                                            No activities available for this city.
                                                        </div>
                                                    ) : (
                                                        availableActivities.map((activity) => (
                                                            <DropdownMenuItem
                                                                key={activity.id}
                                                                className="rounded-xl cursor-pointer p-3 focus:bg-primary/5"
                                                                onClick={() => addActivityToSection(section.id, activity)}
                                                            >
                                                                <div className="flex flex-col gap-0.5">
                                                                    <span className="font-bold text-sm">{activity.name}</span>
                                                                    <span className="text-[10px] text-muted-foreground line-clamp-1">{activity.category}</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        ))
                                                    )}
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    {section.activities.length === 0 ? (
                                        <div className="border-2 border-dashed rounded-2xl p-8 text-center bg-muted/10">
                                            <p className="text-sm text-muted-foreground">No activities added to this section yet.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {section.activities.map((act, actIdx) => (
                                                <div key={`${act.id}-${actIdx}`} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-black/5 group/act">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                            {actIdx + 1}
                                                        </div>
                                                        <span className="font-semibold">{act.name}</span>
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover/act:opacity-100"
                                                        onClick={() => {
                                                            const newActs = [...section.activities]
                                                            newActs.splice(actIdx, 1)
                                                            updateSection(section.id, { activities: newActs })
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>

            {sections.length === 0 && (
                <div className="text-center py-20 bg-muted/20 border-2 border-dashed rounded-[3rem]">
                    <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="text-xl font-bold mb-2">Build Your Journey</h3>
                    <p className="text-muted-foreground mb-6">Create sections to start organizing your travel plan</p>
                    <Button onClick={addSection} className="rounded-xl h-11 px-8 font-bold">
                        Add First Section
                    </Button>
                </div>
            )}
        </div>
    )
}
