import brand from '../assets/brand'

export default function Logo({ size = 'md', variant = 'full', showText = true }) {
  const sizes = {
    xs: { box: 32, icon: 20, text: '18px' },
    sm: { box: 48, icon: 28, text: '24px' },
    md: { box: 64, icon: 38, text: '32px' },
    lg: { box: 80, icon: 48, text: '40px' },
    xl: { box: 100, icon: 60, text: '56px' }
  }

  const current = sizes[size] || sizes.md

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: showText ? '16px' : '0'
    }}>
      {/* Logo Icon */}
      <div style={{
        width: `${current.box}px`,
        height: `${current.box}px`,
        background: brand.colors.primary.gradient,
        borderRadius: brand.borderRadius['2xl'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: brand.shadows.primary,
        transform: variant === 'tilted' ? 'rotate(-5deg)' : 'rotate(0deg)',
        transition: 'all 0.3s ease'
      }}>
        <svg
          width={current.icon}
          height={current.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            fill="white"
            opacity="0.95"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <h1 style={{
          fontSize: current.text,
          fontWeight: brand.typography.fontWeight.black,
          background: brand.colors.primary.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          letterSpacing: '-1px'
        }}>
          {brand.name}
        </h1>
      )}
    </div>
  )
}
