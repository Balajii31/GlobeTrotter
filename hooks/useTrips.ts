import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './useAuth'

export function useTrips() {
    const { user } = useAuth()
    const [trips, setTrips] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        if (!user) return

        async function fetchTrips() {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('trips')
                    .select('*, cities(*)')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setTrips(data || [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTrips()
    }, [user, supabase])

    return { trips, loading, error, refreshTrips: () => { } }
}
