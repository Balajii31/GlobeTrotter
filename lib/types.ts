// Database Types
export interface Profile {
    id: string
    first_name: string | null
    last_name: string | null
    email: string | null
    phone_number: string | null
    city: string | null
    country: string | null
    profile_photo_url: string | null
    is_admin: boolean
    created_at: string
}

export interface City {
    id: string
    name: string
    country: string
    region: string | null
    image_url: string | null
    description: string | null
    is_featured: boolean
    popularity_score: number
    best_time_to_visit: string | null
    seasonal_tag: string | null
    created_at: string
}

export interface Activity {
    id: string
    city_id: string
    name: string
    description: string | null
    category: string | null
    image_url: string | null
    estimated_duration: string | null
    estimated_cost: number | null
    popularity_score: number
    created_at: string
}

export interface Trip {
    id: string
    user_id: string
    city_id: string | null
    title: string | null
    start_date: string
    end_date: string
    status: 'planned' | 'completed' | 'cancelled'
    total_budget: number | null
    created_at: string
    updated_at: string
}

export interface TripSection {
    id: string
    trip_id: string
    title: string | null
    start_date: string | null
    end_date: string | null
    budget: number | null
    order_index: number | null
    created_at: string
}

export interface TripActivity {
    id: string
    trip_section_id: string
    activity_id: string | null
    custom_activity_name: string | null
    notes: string | null
    order_index: number | null
    created_at: string
}

export interface UserActivityLog {
    id: string
    user_id: string | null
    activity_type: string | null
    entity_id: string | null
    entity_type: string | null
    created_at: string
}

// Extended types with relations
export interface CityWithActivities extends City {
    activities: Activity[]
}

export interface TripWithDetails extends Trip {
    city: City | null
    sections: TripSectionWithActivities[]
}

export interface TripSectionWithActivities extends TripSection {
    activities: (TripActivity & {
        activity: Activity | null
    })[]
}

// UI Component Types
export interface CityCardProps {
    city: City
    onClick?: () => void
}

export interface ActivityCardProps {
    activity: Activity
    onAdd?: () => void
    isAdded?: boolean
}

export interface TripCardProps {
    trip: Trip & { city?: City }
    onEdit?: () => void
    onDelete?: () => void
}

// Form Types (already in validations, but here for reference)
export type TripStatus = 'planned' | 'completed' | 'cancelled'
export type ActivityCategory = 'Sightseeing' | 'Food & Drink' | 'Culture' | 'Outdoor' | 'Adventure' | 'Shopping' | 'Nightlife' | 'Other'

// Analytics Types
export interface AnalyticsOverview {
    totalUsers: number
    totalTrips: number
    activeUsers: number
    newTripsThisMonth: number
}

export interface PopularDestination {
    city: City
    tripCount: number
    growthPercentage: number
}

export interface PopularActivity {
    activity: Activity
    bookingCount: number
}

// Search and Filter Types
export interface SearchFilters {
    query?: string
    region?: string
    country?: string
    category?: string
    minBudget?: number
    maxBudget?: number
    sortBy?: 'popularity' | 'alphabetical' | 'newest'
}

export interface PaginationParams {
    page: number
    pageSize: number
    total?: number
}
