import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen overflow-hidden bg-background flex">
            {/* Sidebar is fixed via its own classes, but we ensure the container is height-constrained */}
            <Sidebar />

            {/* Main content area that scrolls independently */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-[288px]"> {/* Sidebar width is 72 (288px) */}
                <main className="flex-1 overflow-y-auto bg-muted/5">
                    {children}
                </main>
            </div>
        </div>
    )
}
