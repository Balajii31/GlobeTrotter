import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/cities - Get all cities (with optional filtering)
export async function GET(request: Request) {
    try {
        const supabase = await createClient()

        const { searchParams } = new URL(request.url)
        const region = searchParams.get('region')
        const featured = searchParams.get('featured')

        let query = supabase.from('cities').select('*').order('popularity_score', { ascending: false })

        if (region) {
            query = query.eq('region', region)
        }

        if (featured === 'true') {
            query = query.eq('is_featured', true)
        }

        const { data: cities, error } = await query

        if (error) {
            console.error('Error fetching cities:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ cities })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
