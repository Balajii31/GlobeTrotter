'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function RegisterForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                    },
                },
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success('Registration successful! Please check your email.')
            router.push('/login')
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) throw error
        } catch (error: any) {
            toast.error(error.message || 'Google login failed')
        }
    }

    return (
        <Card className="w-full max-w-lg mx-auto shadow-2xl border-none p-4 rounded-[2rem] bg-background/80 backdrop-blur-md">
            <CardHeader className="text-center pb-8 pt-6">
                <CardTitle className="text-3xl font-bold tracking-tight mb-2">Create Account</CardTitle>
                <CardDescription className="text-sm">
                    Join Globetrotter and start planning your next adventure.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-semibold ml-1">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    {...register('firstName')}
                                    disabled={isLoading}
                                    className="h-12 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-all"
                                />
                                {errors.firstName && (
                                    <p className="text-xs text-destructive font-medium ml-1">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-semibold ml-1">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    {...register('lastName')}
                                    disabled={isLoading}
                                    className="h-12 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-all"
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-destructive font-medium ml-1">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold ml-1">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register('email')}
                                disabled={isLoading}
                                className="h-12 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-all"
                            />
                            {errors.email && (
                                <p className="text-xs text-destructive font-medium ml-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold ml-1">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                disabled={isLoading}
                                className="h-12 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-all"
                            />
                            {errors.password && (
                                <p className="text-xs text-destructive font-medium ml-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-semibold ml-1">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                {...register('confirmPassword')}
                                disabled={isLoading}
                                className="h-12 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-all"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-destructive font-medium ml-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : 'Create Account'}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-background px-4 text-muted-foreground font-medium uppercase tracking-widest">Or sign up with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full h-12 rounded-xl border-muted hover:bg-muted font-semibold transition-all"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="mr-3 h-5 w-5" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Google
                    </Button>

                    <p className="text-center text-sm font-medium text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
