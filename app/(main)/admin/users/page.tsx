import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, MoreVertical, Shield, Trash2, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { UserManagement } from '@/components/admin/UserManagement'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'User Management - Admin',
    description: 'Manage platform users',
}

export default function UsersManagementPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="mb-12">
                <Link href="/admin">
                    <Button variant="ghost" className="mb-6 -ml-4 gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-5xl font-black tracking-tight mb-4">Traveler <span className="text-gradient">Directory</span></h1>
                <p className="text-muted-foreground text-xl max-w-2xl">
                    Maintain the integrity of the Globetrotter community. Verify, promote, and moderate explorers.
                </p>
            </div>

            <UserManagement />
        </div>
    )
}
