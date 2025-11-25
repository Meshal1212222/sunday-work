import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const THEMES = {
  PRO: 'pro',
  CLASSIC: 'classic'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // استرجاع الثيم المحفوظ من localStorage
    const saved = localStorage.getItem('sunday-theme')
    return saved || THEMES.PRO
  })

  const [advancedFeatures, setAdvancedFeatures] = useState(() => {
    const saved = localStorage.getItem('sunday-advanced-features')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sunday-theme', theme)
    // تطبيق class على body
    document.body.className = `theme-${theme}`
  }, [theme])

  useEffect(() => {
    localStorage.setItem('sunday-advanced-features', advancedFeatures)
  }, [advancedFeatures])

  const toggleTheme = () => {
    setTheme(prev => prev === THEMES.PRO ? THEMES.CLASSIC : THEMES.PRO)
  }

  const switchToPro = () => setTheme(THEMES.PRO)
  const switchToClassic = () => setTheme(THEMES.CLASSIC)

  const toggleAdvancedFeatures = () => {
    setAdvancedFeatures(prev => !prev)
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    switchToPro,
    switchToClassic,
    isPro: theme === THEMES.PRO,
    isClassic: theme === THEMES.CLASSIC,
    advancedFeatures,
    setAdvancedFeatures,
    toggleAdvancedFeatures
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
