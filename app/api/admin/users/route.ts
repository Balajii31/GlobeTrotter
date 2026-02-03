import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

async function checkAuth(supabase: any) {
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
}

export async function GET(request: Request) {
    try {
        const supabase = await createClient()
        if (!(await checkAuth(supabase))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { data: users, error } = await supabase
            .from('profiles')
            .select(`
                *,
                trips:trips(count)
            `)
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json({ users })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const supabase = await createClient()
        if (!(await checkAuth(supabase))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { userId, isAdmin } = await request.json()
        const { error } = await supabase
            .from('profiles')
            .update({ is_admin: isAdmin })
            .eq('id', userId)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createClient()
        if (!(await checkAuth(supabase))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

        // Note: Real deletion usually happens in auth.users, but for this exercise we delete from profile
        const { error } = await supabase.from('profiles').delete().eq('id', userId)

        if (error) throw error
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
