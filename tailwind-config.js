tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                darkBg: '#0b0f19',
                darkCard: '#111827',
                accentCyan: '#06b6d4',
                accentBlue: '#2563eb',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                'gradient-glow': 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
                'gradient-btn': 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
            }
        }
    }
}
