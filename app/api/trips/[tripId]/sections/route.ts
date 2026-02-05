import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ tripId: string }> }) {
    try {
        const { tripId } = await params
        const supabase = await createClient()

        const { data: sections, error } = await supabase
            .from('trip_sections')
            .select(`
                *,
                activities:trip_activities(
                    *,
                    activity:activities(*)
                )
            `)
            .eq('trip_id', tripId)
            .order('order_index', { ascending: true })

        if (error) throw error

        return NextResponse.json({ sections })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ tripId: string }> }) {
    try {
        const { tripId } = await params
        const supabase = await createClient()
        const { sections } = await request.json()

        const keptSectionIds: string[] = []

        // Process each section
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i]
            const { id, activities, ...sectionData } = section

            let currentSectionId = id
            const isTempId = !id || id.length < 20 // Detect temp IDs

            if (isTempId) {
                const { data: newSection, error: insertError } = await supabase
                    .from('trip_sections')
                    .insert({
                        ...sectionData,
                        trip_id: tripId,
                        order_index: i
                    })
                    .select()
                    .single()

                if (insertError) throw insertError
                currentSectionId = newSection.id
            } else {
                const { error: updateError } = await supabase
                    .from('trip_sections')
                    .update({
                        ...sectionData,
                        order_index: i
                    })
                    .eq('id', id)

                if (updateError) throw updateError
            }

            keptSectionIds.push(currentSectionId)

            // Sync activities for this section
            // 1. Delete existing activity links for this section
            await supabase
                .from('trip_activities')
                .delete()
                .eq('trip_section_id', currentSectionId)

            // 2. Insert new activity links
            if (activities && activities.length > 0) {
                const activityLinks = activities.map((act: any, idx: number) => ({
                    trip_section_id: currentSectionId,
                    activity_id: act.id,
                    order_index: idx,
                    notes: act.notes || null
                }))

                const { error: actError } = await supabase
                    .from('trip_activities')
                    .insert(activityLinks)

                if (actError) throw actError
            }
        }

        // Delete sections that were removed in the UI
        if (keptSectionIds.length > 0) {
            await supabase
                .from('trip_sections')
                .delete()
                .eq('trip_id', tripId)
                .not('id', 'in', `(${keptSectionIds.join(',')})`)
        } else {
            // If no sections were sent, delete all sections for this trip
            await supabase
                .from('trip_sections')
                .delete()
                .eq('trip_id', tripId)
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Error syncing itinerary:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

