'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, MoreVertical, Shield, Trash2, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface UserProfile {
    id: string
    first_name: string
    last_name: string
    email: string
    city: string
    country: string
    is_admin: boolean
    created_at: string
    trips?: [{ count: number }]
}

export function UserManagement() {
    const [users, setUsers] = useState<UserProfile[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/admin/users')
            const data = await res.json()
            if (data.users) setUsers(data.users)
        } catch (error) {
            toast.error('Failed to load users')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const toggleAdmin = async (userId: string, currentStatus: boolean) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, isAdmin: !currentStatus })
            })
            if (res.ok) {
                toast.success('User role updated')
                fetchUsers()
            }
        } catch (error) {
            toast.error('Failed to update user role')
        }
    }

    const deleteUser = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return
        try {
            const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('User deleted')
                fetchUsers()
            }
        } catch (error) {
            toast.error('Failed to delete user')
        }
    }

    const filteredUsers = users.filter(u =>
        (u.first_name + ' ' + u.last_name).toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white/50 backdrop-blur">
                <CardContent className="p-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search high-value travelers..."
                            className="pl-12 h-14 rounded-2xl border-none bg-muted/20 text-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">Traveler Directory</CardTitle>
                            <CardDescription>Manage permissions and platform access</CardDescription>
                        </div>
                        <Badge variant="outline" className="rounded-full px-4 py-1 font-bold">
                            {filteredUsers.length} Users
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/30">
                                <tr>
                                    <th className="text-left py-4 px-8 font-bold text-xs uppercase tracking-widest text-muted-foreground">identity</th>
                                    <th className="text-left py-4 px-8 font-bold text-xs uppercase tracking-widest text-muted-foreground">origin</th>
                                    <th className="text-center py-4 px-8 font-bold text-xs uppercase tracking-widest text-muted-foreground">status</th>
                                    <th className="text-right py-4 px-8 font-bold text-xs uppercase tracking-widest text-muted-foreground">actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="py-20 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
                                        </td>
                                    </tr>
                                ) : filteredUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-primary/[0.02] transition-colors">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-primary">
                                                    {user.first_name?.[0]}{user.last_name?.[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg">{user.first_name} {user.last_name}</p>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <p className="text-sm font-semibold">{user.city || 'Global'}</p>
                                            <p className="text-xs text-muted-foreground">{user.country || 'Explorer'}</p>
                                        </td>
                                        <td className="py-6 px-8 text-center">
                                            {user.is_admin ? (
                                                <Badge className="bg-purple-500/10 text-purple-600 border-none px-3 py-1 font-bold rounded-lg shadow-sm">
                                                    <Shield className="h-3 w-3 mr-1.5" />
                                                    ADMIN
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-black/10 text-muted-foreground font-bold rounded-lg">
                                                    USER
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10">
                                                        <MoreVertical className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2 min-w-[180px]">
                                                    <DropdownMenuItem
                                                        onClick={() => toggleAdmin(user.id, user.is_admin)}
                                                        className="rounded-xl flex items-center justify-between font-medium cursor-pointer"
                                                    >
                                                        {user.is_admin ? 'Revoke Admin' : 'Grant Admin'}
                                                        <Shield className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => deleteUser(user.id)}
                                                        className="rounded-xl flex items-center justify-between font-medium text-destructive focus:bg-destructive/10 cursor-pointer"
                                                    >
                                                        Delete Explorer
                                                        <Trash2 className="h-4 w-4" />
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function Badge({ children, className, variant }: any) {
    const variants: any = {
        outline: "border border-input",
        default: "bg-primary text-primary-foreground"
    }
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant || 'default']} ${className}`}>
            {children}
        </span>
    )
}
