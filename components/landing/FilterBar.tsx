'use client'

import { Filter, ArrowUpDown, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FilterBar() {
    return (
        <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-semibold border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all hover-scale h-12 px-6">
                <Layers className="h-4 w-4 text-primary" />
                By Region
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-semibold border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all hover-scale h-12 px-6">
                <Filter className="h-4 w-4 text-primary" />
                Categories
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl gap-2 font-semibold border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all hover-scale h-12 px-6">
                <ArrowUpDown className="h-4 w-4 text-primary" />
                Popularity
            </Button>
        </div>
    )
}
