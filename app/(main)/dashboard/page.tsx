import { CityExploration } from '@/components/dashboard/CityExploration'

export default function DashboardPage() {
    return (
        <div className="p-4 lg:p-12 space-y-16">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-background p-8 rounded-2xl border border-primary/10">
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        EXPEDITION CONTROL
                    </h1>
                    <p className="text-muted-foreground font-medium mt-2 max-w-xl">
                        Welcome to the vanguard of global exploration. Sync your itineraries, deploy new journeys, and monitor your travel metrics.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards with updated styling */}
                {[
                    { label: 'Total Expeditions', value: '12', color: 'primary', icon: '🚀' },
                    { label: 'Objectives Met', value: '08', color: 'green-500', icon: '🎯' },
                    { label: 'Active Missions', value: '04', color: 'orange-500', icon: '🛰️' },
                    { label: 'Sectors Visited', value: '15', color: 'purple-500', icon: '🌌' },
                ].map((stat, i) => (
                    <div key={i} className="bg-muted/30 border border-primary/5 rounded-[2rem] p-8 hover:bg-muted/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
                                <p className="text-4xl font-black italic tracking-tighter">{stat.value}</p>
                            </div>
                            <div className="text-3xl group-hover:scale-125 transition-transform duration-500">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* NEW SECTION: Exploratory Cities */}
            <CityExploration />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Recent Activity */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Mission Log</h2>
                    <div className="space-y-4">
                        {[
                            { action: 'Paris deployment initialized', time: '2 hours ago', icon: '⚡' },
                            { action: 'Tokyo parameters synchronized', time: '1 day ago', icon: '📡' },
                            { action: 'London objective database updated', time: '3 days ago', icon: '💾' },
                            { action: 'New York expedition archived', time: '1 week ago', icon: '📁' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-muted/20 border border-transparent hover:border-primary/20 transition-all">
                                <span className="text-2xl">{item.icon}</span>
                                <div className="flex-1">
                                    <p className="font-black uppercase italic tracking-tighter text-sm">{item.action}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Command Center</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href="/trips/new"
                            className="p-8 bg-primary text-white rounded-[2rem] text-center transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20 group"
                        >
                            <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform">➕</div>
                            <p className="font-black uppercase italic tracking-tighter text-lg">NEW MISSION</p>
                        </a>
                        <a
                            href="/trips"
                            className="p-8 bg-background border-2 border-primary rounded-[2rem] text-center transition-all hover:bg-primary/5 hover:scale-[1.02] active:scale-95 group"
                        >
                            <div className="text-4xl mb-4 group-hover:-rotate-12 transition-transform">📂</div>
                            <p className="font-black uppercase italic tracking-tighter text-lg text-primary">DATABASE</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

