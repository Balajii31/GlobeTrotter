import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useActivities(cityId?: string) {
    const [activities, setActivities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        async function fetchActivities() {
            try {
                setLoading(true)
                let query = supabase.from('activities').select('*')

                if (cityId) {
                    query = query.eq('city_id', cityId)
                }

                const { data, error } = await query.order('popularity_score', { ascending: false })

                if (error) throw error
                setActivities(data || [])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchActivities()
    }, [cityId, supabase])

    return { activities, loading, error }
}
