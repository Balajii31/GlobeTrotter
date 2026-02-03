export function Logo({ className = "h-8 w-8" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Gradient Definitions */}
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
            </defs>

            {/* Globe Base Circle */}
            <circle
                cx="50"
                cy="50"
                r="38"
                fill="url(#logoGrad)"
                opacity="0.15"
            />

            {/* Latitude Lines */}
            <ellipse
                cx="50"
                cy="50"
                rx="36"
                ry="12"
                stroke="url(#logoGrad)"
                strokeWidth="2.5"
                fill="none"
            />
            <ellipse
                cx="50"
                cy="50"
                rx="36"
                ry="24"
                stroke="url(#logoGrad)"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
            />

            {/* Longitude Arc - Vertical */}
            <path
                d="M 50 12 Q 50 50 50 88"
                stroke="url(#logoGrad)"
                strokeWidth="2.5"
                fill="none"
            />

            {/* Longitude Arc - Left Curve */}
            <path
                d="M 50 12 Q 30 50 50 88"
                stroke="url(#accentGrad)"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
            />

            {/* Longitude Arc - Right Curve */}
            <path
                d="M 50 12 Q 70 50 50 88"
                stroke="url(#accentGrad)"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
            />

            {/* Travel Path - Dotted Line */}
            <path
                d="M 20 35 Q 35 25 50 30 T 80 40"
                stroke="#EC4899"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                fill="none"
                opacity="0.9"
            />

            {/* Destination Pin */}
            <g transform="translate(75, 35)">
                <path
                    d="M 0 0 C 0 -6 -4 -10 -4 -10 C -4 -10 0 -14 4 -10 C 4 -10 0 -6 0 0 Z"
                    fill="url(#logoGrad)"
                    stroke="white"
                    strokeWidth="1.5"
                />
                <circle cx="0" cy="-8" r="2" fill="white" />
            </g>

            {/* Accent Sparkle */}
            <circle cx="25" cy="25" r="2.5" fill="#0EA5E9" opacity="0.8" />
            <circle cx="72" cy="65" r="2" fill="#EC4899" opacity="0.7" />
        </svg>
    )
}
