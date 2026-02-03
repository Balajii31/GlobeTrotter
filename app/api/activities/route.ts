import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/activities - Get activities (optionally filtered by city)
export async function GET(request: Request) {
    try {
        const supabase = await createClient()

        const { searchParams } = new URL(request.url)
        const cityId = searchParams.get('cityId') || searchParams.get('city_id')
        const category = searchParams.get('category')

        let query = supabase
            .from('activities')
            .select('*, city:cities(*)')
            .order('popularity_score', { ascending: false })

        if (cityId) {
            query = query.eq('city_id', cityId)
        }

        if (category) {
            query = query.eq('category', category)
        }

        const { data: activities, error } = await query

        if (error) {
            console.error('Error fetching activities:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ activities })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
