'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success('Welcome back!')
            router.push('/dashboard')
            router.refresh()
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
        <Card className="w-full max-w-md shadow-2xl border-none p-4 rounded-[2rem] bg-background/80 backdrop-blur-md">
            <CardHeader className="text-center pb-8 pt-6">
                <CardTitle className="text-3xl font-bold tracking-tight mb-2">Welcome Back</CardTitle>
                <CardDescription className="text-sm">
                    Enter your credentials to access your trips.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                            <div className="flex items-center justify-between ml-1">
                                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
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

                        <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : 'Sign In'}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-background px-4 text-muted-foreground font-medium uppercase tracking-widest">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full h-12 rounded-xl border-muted hover:bg-muted font-semibold transition-all"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="mr-3 h-5 w-5" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Sign in with Google
                    </Button>

                    <p className="text-center text-sm font-medium text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-primary font-bold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
