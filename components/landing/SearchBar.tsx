'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function SearchBar() {
    const [query, setQuery] = useState('')

    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            <div className="relative group animate-fade-in">
                <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative shadow-2xl rounded-[2rem] overflow-hidden glass transition-all duration-300 group-focus-within:ring-2 ring-primary/50">
                    <Search className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                        type="text"
                        placeholder="Where would you like to go?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-16 sm:pl-20 pr-8 h-16 sm:h-20 text-lg sm:text-xl border-none bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/50 transition-all font-medium"
                    />
                </div>
            </div>
        </div>
    )
}
