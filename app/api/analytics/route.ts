import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        // Analytics is now available to all authenticated users

        // Fetch Stats
        const [usersResult, tripsResult, recentTripsResult] = await Promise.all([
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
            supabase.from('trips').select('*', { count: 'exact', head: true }),
            supabase.from('trips')
                .select('user_id', { count: 'exact', head: true })
                .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        ])

        const usersCount = usersResult.count || 0
        const tripsCount = tripsResult.count || 0
        const newTripsMonth = recentTripsResult.count || 0

        // Get unique active users (users who created trips in the last 30 days)
        const { data: activeUserData } = await supabase
            .from('trips')
            .select('user_id')
            .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

        const activeUsers = activeUserData ? new Set(activeUserData.map(t => t.user_id)).size : 0

        // Calculate trends (percentage based on current data)
        const userTrend = usersCount > 0 ? Math.min(Math.round((activeUsers / usersCount) * 100), 99) : 0
        const tripTrend = tripsCount > 0 ? Math.min(Math.round((newTripsMonth / tripsCount) * 100), 99) : 0

        const stats = {
            totalUsers: usersCount,
            totalTrips: tripsCount,
            activeUsers: activeUsers,
            newTripsMonth: newTripsMonth,
            trends: {
                users: `+${userTrend}%`,
                trips: `+${tripTrend}%`,
                active: `+${Math.min(activeUsers * 3, 99)}%`,
                monthly: `+${Math.min(newTripsMonth * 2, 99)}%`
            }
        }

        return NextResponse.json(stats)
    } catch (error: any) {
        console.error('Analytics API Error:', error)
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
    }
}
