'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { tripSchema, type TripFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react'
import { ActivitySelector } from './ActivitySelector'

interface City {
    id: string
    name: string
    country: string
}

export function CreateTripForm() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [cities, setCities] = useState<City[]>([])
    const [loadingCities, setLoadingCities] = useState(true)
    const [activities, setActivities] = useState<any[]>([])
    const [selectedActivities, setSelectedActivities] = useState<string[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
    } = useForm<TripFormData>({
        resolver: zodResolver(tripSchema),
    })

    const selectedCityId = watch('cityId')

    // Load cities
    useEffect(() => {
        async function loadCities() {
            try {
                const response = await fetch('/api/cities')
                const data = await response.json()
                if (data.cities) setCities(data.cities)
            } catch (error) {
                console.error('Error loading cities:', error)
            } finally {
                setLoadingCities(false)
            }
        }
        loadCities()
    }, [])

    // Load activities when city is selected
    useEffect(() => {
        if (selectedCityId && step === 2) {
            async function loadActivities() {
                try {
                    const response = await fetch(`/api/activities?cityId=${selectedCityId}`)
                    const data = await response.json()
                    setActivities(data.activities || [])
                } catch (error) {
                    console.error('Error loading activities:', error)
                }
            }
            loadActivities()
        }
    }, [selectedCityId, step])

    const nextStep = async () => {
        const isValid = await trigger(['title', 'cityId', 'startDate', 'endDate'])
        if (isValid) setStep(2)
        else toast.error('Please fill in all required fields')
    }

    const prevStep = () => setStep(1)

    const onToggleActivity = (id: string) => {
        setSelectedActivities(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        )
    }

    const onSubmit = async (data: TripFormData) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.title,
                    city_id: data.cityId,
                    start_date: data.startDate,
                    end_date: data.endDate,
                    total_budget: data.totalBudget || null,
                    activities: selectedActivities,
                }),
            })

            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Failed to create trip')

            toast.success('Trip created successfully!')
            router.push(`/trips/${result.trip.id}/edit`)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create trip')
        } finally {
            setIsLoading(false)
        }
    }

    if (step === 2) {
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Select Activities</h2>
                    <p className="text-muted-foreground">Choose activities for your trip to {cities.find(c => c.id === selectedCityId)?.name}</p>
                </div>

                <ActivitySelector
                    activities={activities}
                    selectedActivities={selectedActivities}
                    onToggleActivity={onToggleActivity}
                    onContinue={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                />

                <div className="flex justify-center">
                    <Button variant="ghost" onClick={prevStep} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto border-2 border-primary rounded-none shadow-bold-lg bg-background">
            <CardHeader className="border-b-2 border-primary">
                <CardTitle className="font-black uppercase text-4xl tracking-tighter italic">NEW EXPEDITION</CardTitle>
                <CardDescription className="font-bold text-muted-foreground uppercase text-xs tracking-widest">
                    SYSTEM INPUT: DEFINE EXPEDITION PARAMETERS
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
                <form className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="font-black uppercase font-bold text-sm tracking-widest">EXPEDITION NAME</Label>
                        <Input
                            id="title"
                            placeholder="e.g., LISBON_SUMMER_2026"
                            {...register('title')}
                            className="h-12 border-2 border-primary rounded-none focus:ring-0 focus:border-primary shadow-bold placeholder:italic uppercase"
                        />
                        {errors.title && <p className="text-sm text-destructive font-black uppercase">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cityId" className="font-black uppercase font-bold text-sm tracking-widest">DESTINATION HUB</Label>
                            <select
                                id="cityId"
                                {...register('cityId')}
                                className="flex h-12 w-full border-2 border-primary bg-background px-3 py-2 text-sm focus:ring-0 focus:border-primary shadow-bold appearance-none rounded-none font-bold uppercase"
                            >
                                <option value="">SELECT DESTINATION...</option>
                                {cities.map((city: any) => (
                                    <option key={city.id} value={city.id}>{city.name.toUpperCase()}, {city.country.toUpperCase()}</option>
                                ))}
                            </select>
                            {errors.cityId && <p className="text-sm text-destructive font-black uppercase">{errors.cityId.message}</p>}
                        </div>

                        {selectedCityId && cities.find((c: any) => c.id === selectedCityId) && (
                            <div className="p-4 bg-muted/30 border-2 border-primary/10 rounded-none animate-in fade-in slide-in-from-top-2">
                                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">PEAK EXPLORATION WINDOW</p>
                                        <p className="font-black italic uppercase text-primary">
                                            {cities.find((c: any) => c.id === selectedCityId)?.best_time_to_visit || 'DATA UNAVAILABLE'}
                                        </p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CLIMATE CATEGORY</p>
                                        <p className="font-black italic uppercase text-primary">
                                            {cities.find((c: any) => c.id === selectedCityId)?.seasonal_tag || 'YEAR-ROUND'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label className="font-black uppercase font-bold text-sm tracking-widest">ARRIVAL</Label>
                            <Input
                                type="date"
                                {...register('startDate', { valueAsDate: true })}
                                className="h-12 border-2 border-primary rounded-none focus:ring-0 focus:border-primary shadow-bold font-bold"
                            />
                            {errors.startDate && <p className="text-sm text-destructive font-black uppercase">{errors.startDate.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="font-black uppercase font-bold text-sm tracking-widest">DEPARTURE</Label>
                            <Input
                                type="date"
                                {...register('endDate', { valueAsDate: true })}
                                className="h-12 border-2 border-primary rounded-none focus:ring-0 focus:border-primary shadow-bold font-bold"
                            />
                            {errors.endDate && <p className="text-sm text-destructive font-black uppercase">{errors.endDate.message}</p>}
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={nextStep}
                        className="w-full h-16 bg-primary hover:bg-primary text-primary-foreground border-2 border-primary shadow-bold rounded-none font-black text-xl uppercase tracking-tighter transition-all hover:shadow-none italic"
                    >
                        INITIALIZE ACTIVITIES
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
