import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 32,
    height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                    borderRadius: '8px',
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Globe Circle */}
                    <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="4" fill="none" opacity="0.9" />

                    {/* Latitude Line */}
                    <ellipse cx="50" cy="50" rx="36" ry="12" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />

                    {/* Longitude Line */}
                    <path d="M 50 12 Q 50 50 50 88" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />

                    {/* Destination Marker */}
                    <path d="M 75 35 L 75 42 L 72 45 L 75 45 L 78 45 L 75 42 Z" fill="white" opacity="0.9" />
                    <circle cx="75" cy="37" r="3" fill="white" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
