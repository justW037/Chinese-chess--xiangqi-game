import { ReactNode } from 'react'

import { useTheme } from '../../components/ThemeContext'
import Sidebar from '../../components/ui/SideBar'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isDarkMode } = useTheme()

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: isDarkMode ? "url('/dbg.jpg')" : "url('/bg.png')",
        backgroundSize: 'cover'
      }}
    >
      <div className="flex flex-1 relative">
        <Sidebar />
        <main className="flex-1 pl-48 py-4 pr-4 h-screen">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
