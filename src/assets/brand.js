// Sunday Brand Identity System
// نظام الهوية البصرية الكامل لمنصة Sunday - مستوحى من Monday.com و Slack

export const brand = {
  // Brand Personality
  personality: {
    voice: 'ودود، احترافي، مبتكر',
    tone: 'متفائل، داعم، ملهم',
    style: 'عصري، نابض بالحياة، منظم'
  },

  // Colors - نظام ألوان غني ومتنوع
  colors: {
    // Primary Brand Colors
    primary: {
      main: '#6C5CE7',      // بنفسجي نابض
      light: '#A29BFE',
      dark: '#5F3DC4',
      gradient: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)'
    },

    // Vibrant Accent Colors (مثل Monday)
    vibrant: {
      purple: '#6C5CE7',
      blue: '#0984E3',
      green: '#00B894',
      yellow: '#FDCB6E',
      orange: '#FF7675',
      pink: '#FD79A8',
      teal: '#00CEC9',
      red: '#FF6B6B'
    },

    // Functional Colors
    success: '#00B894',
    warning: '#FDCB6E',
    danger: '#FF6B6B',
    info: '#0984E3',
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

  // Logo SVG - تصميم فريد مستوحى من الشمس والأحد
  logo: {
    // الشمس المشرقة = Sunday = يوم الأحد
    full: `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDCB6E"/>
          <stop offset="50%" stop-color="#FF7675"/>
          <stop offset="100%" stop-color="#6C5CE7"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <!-- الدائرة الخارجية -->
      <circle cx="60" cy="60" r="35" fill="url(#sunGradient)" filter="url(#glow)"/>
      <!-- الأشعة -->
      <g stroke="url(#sunGradient)" stroke-width="4" stroke-linecap="round">
        <line x1="60" y1="10" x2="60" y2="25"/>
        <line x1="95" y1="25" x2="85" y2="35"/>
        <line x1="110" y1="60" x2="95" y2="60"/>
        <line x1="95" y1="95" x2="85" y2="85"/>
        <line x1="60" y1="110" x2="60" y2="95"/>
        <line x1="25" y1="95" x2="35" y2="85"/>
        <line x1="10" y1="60" x2="25" y2="60"/>
        <line x1="25" y1="25" x2="35" y2="35"/>
      </g>
      <!-- حرف S في المنتصف -->
      <text x="60" y="75" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">S</text>
    </svg>`,

    // أيقونة مبسطة
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="14" fill="url(#sunGradient)"/>
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="24" y1="4" x2="24" y2="10"/>
        <line x1="38" y1="10" x2="34" y2="14"/>
        <line x1="44" y1="24" x2="38" y2="24"/>
        <line x1="38" y1="38" x2="34" y2="34"/>
        <line x1="24" y1="44" x2="24" y2="38"/>
        <line x1="10" y1="38" x2="14" y2="34"/>
        <line x1="4" y1="24" x2="10" y2="24"/>
        <line x1="10" y1="10" x2="14" y2="14"/>
      </g>
    </svg>`,

    // Favicon
    favicon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#6C5CE7"/>
      <text x="16" y="22" font-family="Arial" font-size="20" font-weight="bold" fill="white" text-anchor="middle">S</text>
    </svg>`
  },

  // Illustrations - رسومات توضيحية
  illustrations: {
    empty: '🌅',
    success: '🎉',
    error: '😕',
    loading: '⏳',
    celebration: '🎊',
    rocket: '🚀',
    star: '⭐',
    fire: '🔥'
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
