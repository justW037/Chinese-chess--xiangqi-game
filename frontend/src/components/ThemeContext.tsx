import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'
import Cookies from 'js-cookie'

interface ThemeContextProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = Cookies.get('theme')
    return savedTheme === 'dark' || savedTheme === undefined
  })

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode
      Cookies.set('theme', newMode ? 'dark' : 'light', { expires: 365 })
      return newMode
    })
  }

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
