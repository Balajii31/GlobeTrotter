'use client'

import { ProfileEditor } from '@/components/profile/ProfileEditor'
import { TripHistory } from '@/components/profile/TripHistory'
import { Card, CardContent } from '@/components/ui/card'
import { User, Mail, Calendar, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
    email: string
    created_at: string
    full_name?: string
    bio?: string
    location?: string
}

export default function ProfilePage() {
    const { user } = useAuth()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setIsLoading(false)
                return
            }

            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (error) throw error

                setProfile({
                    email: user.email || '',
                    created_at: data?.created_at || user.created_at || new Date().toISOString(),
                    full_name: data?.full_name,
                    bio: data?.bio,
                    location: data?.location
                })
            } catch (error) {
                console.error('Error fetching profile:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [user, refreshKey])

    const handleProfileUpdate = () => {
        // Trigger a refresh of the profile data
        setRefreshKey(prev => prev + 1)
    }

    const formatMemberSince = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                    Manage your account settings and preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Main Content - Profile Editor */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    <ProfileEditor onUpdate={handleProfileUpdate} />

                    {/* Account Stats */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <Card>
                            <CardContent className="p-4 sm:p-6 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">0</div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Total Trips</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 sm:p-6 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">0</div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Countries</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 sm:p-6 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">0</div>
                                <p className="text-xs sm:text-sm text-muted-foreground">Cities</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sidebar - Trip History */}
                <div className="lg:col-span-1">
                    <TripHistory />

                    {/* Account Info Card */}
                    <Card className="mt-6">
                        <CardContent className="p-4 sm:p-6 space-y-4">
                            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Account Information</h3>

                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium text-sm truncate">{profile?.email || 'Not set'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Member Since</p>
                                    <p className="font-medium text-sm">
                                        {profile?.created_at ? formatMemberSince(profile.created_at) : 'Unknown'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Account Type</p>
                                    <p className="font-medium text-sm">Free User</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
