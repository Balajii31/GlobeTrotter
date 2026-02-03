import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/trips/[tripId] - Get single trip with full details
export async function GET(
    request: Request,
    { params }: { params: { tripId: string } }
) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: trip, error } = await supabase
            .from('trips')
            .select(`
        *,
        city:cities(*),
        sections:trip_sections(
          *,
          activities:trip_activities(
            *,
            activity:activities(*)
          )
        )
      `)
            .eq('id', params.tripId)
            .eq('user_id', user.id)
            .single()

        if (error) {
            console.error('Error fetching trip:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (!trip) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 })
        }

        return NextResponse.json({ trip })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// PATCH /api/trips/[tripId] - Update trip
export async function PATCH(
    request: Request,
    { params }: { params: { tripId: string } }
) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, city_id, start_date, end_date, total_budget, status } = body

        const { data: trip, error } = await supabase
            .from('trips')
            .update({
                title,
                city_id,
                start_date,
                end_date,
                total_budget,
                status,
                updated_at: new Date().toISOString(),
            })
            .eq('id', params.tripId)
            .eq('user_id', user.id)
            .select(`
        *,
        city:cities(*)
      `)
            .single()

        if (error) {
            console.error('Error updating trip:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ trip })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE /api/trips/[tripId] - Delete trip
export async function DELETE(
    request: Request,
    { params }: { params: { tripId: string } }
) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { error } = await supabase
            .from('trips')
            .delete()
            .eq('id', params.tripId)
            .eq('user_id', user.id)

        if (error) {
            console.error('Error deleting trip:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ message: 'Trip deleted successfully' })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
