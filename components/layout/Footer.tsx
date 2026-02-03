import Link from 'next/link'
import { Globe, Facebook, Twitter, Instagram, Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t bg-muted/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
                    {/* Brand */}
                    <div className="space-y-6 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Globe className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-gradient">
                                Globetrotter
                            </span>
                        </Link>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Crafting unforgettable journeys with cutting-edge planning tools. Explore the world with confidence and style.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 tracking-tight">Venture</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Home', 'My Trips', 'New Trip', 'Profile'].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={link === 'New Trip' ? '/trips/new' : `/${link.toLowerCase().replace(' ', '')}`}
                                        className="text-muted-foreground hover:text-primary transition-colors inline-block"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 tracking-tight">Support</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-block">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 tracking-tight">Connect</h3>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Mail].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-all hover-scale"
                                    aria-label="Social Link"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary/5 mt-16 sm:mt-24 pt-8 text-center">
                    <p className="text-sm text-muted-foreground font-medium">
                        &copy; {new Date().getFullYear()} <span className="text-primary">Globetrotter</span>. Crafted with passion for global explorers.
                    </p>
                </div>
            </div>
        </footer>
    )
}
