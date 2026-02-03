import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="lg:pl-72">
                <main className="min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    )
}
