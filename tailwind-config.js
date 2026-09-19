tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                darkBg: '#0b0f19',
                darkCard: '#111827',
                accentBlue: '#00F2FE',
                accentPurple: '#7000FF',
                accentPink: '#FF007A',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
                'gradient-glow': 'linear-gradient(135deg, #7000FF 0%, #FF007A 100%)',
                'gradient-btn': 'linear-gradient(90deg, #3B82F6 0%, #EC4899 100%)',
            }
        }
    }
}
