// Sunday Brand Identity System
// نظام الهوية البصرية الكامل لمنصة Sunday

export const brand = {
  // Colors - الألوان
  colors: {
    primary: {
      main: '#5B4E9D',
      light: '#7C6DB8',
      dark: '#43367A',
      gradient: 'linear-gradient(135deg, #5B4E9D 0%, #8B5CF6 100%)'
    },
    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED'
    },
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    info: '#007AFF',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  },

  // Typography - الخطوط
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      arabic: 'Tajawal, -apple-system, sans-serif',
      code: '"Fira Code", "Courier New", monospace'
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px'
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900
    }
  },

  // Spacing - المسافات
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px'
  },

  // Border Radius - الحواف
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px'
  },

  // Shadows - الظلال
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    primary: '0 10px 30px rgba(91, 78, 157, 0.3)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },

  // Logo SVG
  logo: {
    // SVG Logo كامل
    svg: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sundayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#5B4E9D;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="20" fill="url(#sundayGradient)"/>
      <g transform="translate(16, 16)">
        <path d="M24 4L4 14L24 24L44 14L24 4Z" fill="white" opacity="0.9"/>
        <path d="M4 34L24 44L44 34" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 24L24 34L44 24" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>`,

    // Icon only (صغير)
    icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // Brand Info
  name: 'Sunday',
  tagline: 'منصة إدارة المشاريع الاحترافية',
  description: 'نظام متكامل لإدارة المشاريع والمهام بكفاءة عالية',

  // Features
  features: [
    { icon: '⚡', title: 'سريع', description: 'أداء فائق السرعة' },
    { icon: '🎯', title: 'منظم', description: 'إدارة احترافية للمهام' },
    { icon: '👥', title: 'تعاوني', description: 'عمل جماعي فعّال' },
    { icon: '📊', title: 'تحليلي', description: 'تقارير وإحصائيات دقيقة' },
    { icon: '🔒', title: 'آمن', description: 'حماية متقدمة للبيانات' },
    { icon: '🚀', title: 'مبتكر', description: 'ميزات حديثة ومتطورة' }
  ]
}

// Helper Functions
export const getBrandColor = (color, shade = 'main') => {
  if (typeof color === 'string' && !shade) {
    return brand.colors[color] || color
  }
  return brand.colors[color]?.[shade] || color
}

export const getBrandSpacing = (size) => {
  return brand.spacing[size] || size
}

export const getBrandRadius = (size) => {
  return brand.borderRadius[size] || size
}

export const getBrandShadow = (size) => {
  return brand.shadows[size] || size
}

export default brand
