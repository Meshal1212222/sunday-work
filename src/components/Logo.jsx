import brand from '../assets/brand'

export default function Logo({ size = 'md', variant = 'full', showText = true, animated = false }) {
  const sizes = {
    xs: { box: 40, text: '18px' },
    sm: { box: 56, text: '24px' },
    md: { box: 72, text: '32px' },
    lg: { box: 96, text: '42px' },
    xl: { box: 120, text: '56px' }
  }

  const current = sizes[size] || sizes.md

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: showText ? '20px' : '0',
      flexDirection: variant === 'stacked' ? 'column' : 'row'
    }}>
      {/* Sunday Logo - الشمس المشرقة */}
      <div
        style={{
          width: `${current.box}px`,
          height: `${current.box}px`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: animated ? 'rotateSun 20s linear infinite' : 'none'
        }}
      >
        <svg
          width={current.box}
          height={current.box}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={brand.colors.vibrant.yellow} />
              <stop offset="50%" stopColor={brand.colors.vibrant.orange} />
              <stop offset="100%" stopColor={brand.colors.vibrant.purple} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* الدائرة الرئيسية */}
          <circle cx="60" cy="60" r="35" fill="url(#sunGradient)" filter="url(#glow)" />

          {/* أشعة الشمس */}
          <g stroke="url(#sunGradient)" strokeWidth="5" strokeLinecap="round" opacity="0.8">
            <line x1="60" y1="10" x2="60" y2="25" />
            <line x1="95" y1="25" x2="85" y2="35" />
            <line x1="110" y1="60" x2="95" y2="60" />
            <line x1="95" y1="95" x2="85" y2="85" />
            <line x1="60" y1="110" x2="60" y2="95" />
            <line x1="25" y1="95" x2="35" y2="85" />
            <line x1="10" y1="60" x2="25" y2="60" />
            <line x1="25" y1="25" x2="35" y2="35" />
          </g>

          {/* حرف S */}
          <text
            x="60"
            y="77"
            fontFamily="Arial, sans-serif"
            fontSize="52"
            fontWeight="900"
            fill="white"
            textAnchor="middle"
          >
            S
          </text>
        </svg>

        <style>{`
          @keyframes rotateSun {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* النص */}
      {showText && (
        <div style={{ textAlign: variant === 'stacked' ? 'center' : 'left' }}>
          <h1
            style={{
              fontSize: current.text,
              fontWeight: brand.typography.fontWeight.black,
              background: `linear-gradient(135deg, ${brand.colors.vibrant.purple} 0%, ${brand.colors.vibrant.orange} 50%, ${brand.colors.vibrant.yellow} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              letterSpacing: '-2px',
              lineHeight: 1
            }}
          >
            {brand.name}
          </h1>
          {variant === 'full' && (
            <p
              style={{
                fontSize: `calc(${current.text} * 0.3)`,
                color: brand.colors.gray[600],
                margin: '4px 0 0 0',
                fontWeight: brand.typography.fontWeight.medium
              }}
            >
              {brand.tagline}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
