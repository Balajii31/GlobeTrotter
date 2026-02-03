import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET /api/profile - Get current user's profile
export async function GET(request: Request) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (error) {
            console.error('Error fetching profile:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ profile })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// PATCH /api/profile - Update user profile
export async function PATCH(request: Request) {
    try {
        const supabase = await createClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { first_name, last_name, phone_number, city, country, profile_photo_url } = body

        const { data: profile, error } = await supabase
            .from('profiles')
            .update({
                first_name,
                last_name,
                phone_number,
                city,
                country,
                profile_photo_url,
            })
            .eq('id', user.id)
            .select()
            .single()

        if (error) {
            console.error('Error updating profile:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ profile })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
