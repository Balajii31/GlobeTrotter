import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/trips - Get all trips for current user
export async function GET(request: Request) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: trips, error } = await supabase
            .from('trips')
            .select(`
        *,
        city:cities(*)
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching trips:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ trips })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST /api/trips - Create new trip
export async function POST(request: Request) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, city_id, start_date, end_date, total_budget, activities = [], status = 'planned' } = body

        // Validate required fields
        if (!title || !start_date || !end_date) {
            return NextResponse.json(
                { error: 'Missing required fields: title, start_date, end_date' },
                { status: 400 }
            )
        }

        // 1. Create the Trip
        const { data: trip, error: tripError } = await supabase
            .from('trips')
            .insert({
                user_id: user.id,
                title,
                city_id,
                start_date,
                end_date,
                total_budget,
                status,
            })
            .select()
            .single()

        if (tripError) {
            console.error('Error creating trip:', tripError)
            return NextResponse.json({ error: tripError.message }, { status: 500 })
        }

        // 2. If activities were selected, create a default section and add them
        if (activities.length > 0) {
            const { data: section, error: sectionError } = await supabase
                .from('trip_sections')
                .insert({
                    trip_id: trip.id,
                    title: 'Initial Itinerary',
                    start_date,
                    end_date,
                    order_index: 0
                })
                .select()
                .single()

            if (!sectionError && section) {
                const tripActivities = activities.map((activityId: string, index: number) => ({
                    trip_section_id: section.id,
                    activity_id: activityId,
                    order_index: index
                }))

                await supabase.from('trip_activities').insert(tripActivities)
            }
        }

        return NextResponse.json({ trip }, { status: 201 })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
