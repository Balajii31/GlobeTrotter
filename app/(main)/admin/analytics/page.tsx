import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, TrendingUp, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Analytics - Admin',
    description: 'Platform analytics and insights',
}

// Sample analytics data
const topCities = [
    { name: 'Paris, France', trips: 245, growth: '+12%' },
    { name: 'Tokyo, Japan', trips: 198, growth: '+8%' },
    { name: 'New York, USA', trips: 176, growth: '+15%' },
    { name: 'Barcelona, Spain', trips: 143, growth: '+5%' },
    { name: 'London, UK', trips: 132, growth: '+10%' },
]

const topActivities = [
    { name: 'Eiffel Tower Visit', bookings: 156, category: 'Sightseeing' },
    { name: 'Tokyo Food Tour', bookings: 134, category: 'Food & Drink' },
    { name: 'Louvre Museum', bookings: 128, category: 'Culture' },
    { name: 'Central Park Walk', bookings: 98, category: 'Outdoor' },
    { name: 'Sagrada Familia', bookings: 87, category: 'Sightseeing' },
]

export default function AnalyticsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Analytics & Insights</h1>
                        <p className="text-muted-foreground text-lg">
                            Platform performance and trends
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Last 30 Days
                        </Button>
                        <Button variant="outline">Export</Button>
                    </div>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">Page Views</p>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold">45,231</p>
                        <p className="text-xs text-green-500 mt-1">+18.2% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">New Trips</p>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold">287</p>
                        <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">New Users</p>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold">143</p>
                        <p className="text-xs text-green-500 mt-1">+24.1% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">Avg. Trip Value</p>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold">$2,450</p>
                        <p className="text-xs text-green-500 mt-1">+8.3% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Cities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Top Destinations
                        </CardTitle>
                        <CardDescription>
                            Most popular cities by trip count
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topCities.map((city, index) => (
                                <div key={city.name} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{city.name}</p>
                                        <p className="text-sm text-muted-foreground">{city.trips} trips</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-semibold text-green-500">{city.growth}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Popular Activities
                        </CardTitle>
                        <CardDescription>
                            Most booked activities across all trips
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topActivities.map((activity, index) => (
                                <div key={activity.name} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{activity.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.category} • {activity.bookings} bookings
                                        </p>
                                    </div>
                                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-accent"
                                            style={{ width: `${(activity.bookings / 156) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Growth Chart Placeholder */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Growth Trends</CardTitle>
                    <CardDescription>
                        User registrations and trip creations over time
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed">
                        <div className="text-center text-muted-foreground">
                            <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Chart visualization would go here</p>
                            <p className="text-sm">(Integration with charting library)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
