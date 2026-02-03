'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { profileSchema, type ProfileFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Camera, User, MapPin, Phone, Globe } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface ProfileEditorProps {
    onUpdate?: () => void
}

export function ProfileEditor({ onUpdate }: ProfileEditorProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [profileImage, setProfileImage] = useState<string>('')
    const [uploadingImage, setUploadingImage] = useState(false)
    const [profile, setProfile] = useState<any>(null)

    const supabase = createClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    })

    useEffect(() => {
        async function loadProfile() {
            try {
                const response = await fetch('/api/profile')
                const data = await response.json()
                if (data.profile) {
                    setProfile(data.profile)
                    setValue('firstName', data.profile.first_name || '')
                    setValue('lastName', data.profile.last_name || '')
                    setValue('phoneNumber', data.profile.phone_number || '')
                    setValue('city', data.profile.city || '')
                    setValue('country', data.profile.country || '')
                    setProfileImage(data.profile.profile_photo_url || '')
                }
            } catch (error) {
                console.error('Error loading profile:', error)
            }
        }
        loadProfile()
    }, [setValue])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploadingImage(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')
            const fileExt = file.name.split('.').pop()
            const filePath = `profile-photos/${user.id}-${Date.now()}.${fileExt}`
            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
            if (uploadError) throw uploadError
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
            setProfileImage(publicUrl)
            toast.success('Identity visual updated!')
        } catch (error) {
            toast.error('Local preview used (Storage not ready)')
            const sc = URL.createObjectURL(file)
            setProfileImage(sc)
        } finally {
            setUploadingImage(false)
        }
    }

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    phone_number: data.phoneNumber,
                    city: data.city,
                    country: data.country,
                    profile_photo_url: profileImage
                })
            })
            if (res.ok) {
                toast.success('Explorer profile synced!')
                // Call the onUpdate callback to refresh parent component
                if (onUpdate) {
                    onUpdate()
                }
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error('Sync failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white/40 backdrop-blur-xl h-fit">
                <CardContent className="p-10 flex flex-col items-center">
                    <div className="relative group mb-8">
                        <div className="w-48 h-48 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 hover:scale-105">
                            {profileImage ? (
                                <Image
                                    src={profileImage}
                                    alt="Profile"
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-20 h-20 text-primary/40" />
                            )}
                        </div>
                        <label className="absolute -bottom-2 -right-2 p-4 bg-primary text-white rounded-2xl cursor-pointer hover:bg-primary/90 transition-all shadow-xl hover:scale-110 active:scale-95">
                            {uploadingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black tracking-tight">{profile?.first_name || 'Adventurer'} {profile?.last_name || ''}</h2>
                        <p className="text-muted-foreground font-medium">{profile?.email}</p>
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <span className="bg-primary/10 text-primary rounded-full font-bold px-3 py-1 text-xs">Master Voyager</span>
                            <span className="bg-accent/10 text-accent rounded-full font-bold px-3 py-1 text-xs">Elite Status</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white/60 backdrop-blur-md">
                <CardHeader className="p-10 pb-0">
                    <CardTitle className="text-3xl font-bold">Identity Details</CardTitle>
                    <CardDescription className="text-lg">Refine your explorer profile to personalize your next journey.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">First Name</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                                    <Input {...register('firstName')} placeholder="John" className="h-14 pl-12 rounded-2xl border-none bg-muted/20 focus:bg-white transition-all text-lg font-medium shadow-inner" />
                                </div>
                                {errors.firstName && <p className="text-xs text-destructive font-bold">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Last Name</Label>
                                <Input {...register('lastName')} placeholder="Doe" className="h-14 rounded-2xl border-none bg-muted/20 focus:bg-white transition-all text-lg font-medium shadow-inner" />
                                {errors.lastName && <p className="text-xs text-destructive font-bold">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Communication Line</Label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                                <Input type="tel" {...register('phoneNumber')} placeholder="+1 234 567 8900" className="h-14 pl-12 rounded-2xl border-none bg-muted/20 focus:bg-white transition-all text-lg font-medium shadow-inner" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Base City</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                                    <Input {...register('city')} placeholder="San Francisco" className="h-14 pl-12 rounded-2xl border-none bg-muted/20 focus:bg-white transition-all text-lg font-medium shadow-inner" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Country of Origin</Label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                                    <Input {...register('country')} placeholder="USA" className="h-14 pl-12 rounded-2xl border-none bg-muted/20 focus:bg-white transition-all text-lg font-medium shadow-inner" />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full h-16 rounded-[2rem] text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all">
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Sync Profile Improvements'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
