import { Link } from 'react-router-dom'
import { TbLogout2 } from 'react-icons/tb'
import { MdLightMode } from 'react-icons/md'
import { HiLogout } from 'react-icons/hi'
import { useState } from 'react'
import { FaRegUserCircle, FaUserFriends, FaRegUser } from 'react-icons/fa'
import { useTheme } from '../ThemeContext'
import useUserStore from '../../zustand/userStore'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { isDarkMode, toggleTheme } = useTheme()
  const [isVisibleMenu, setIsVisibleMenu] = useState(false)
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  const { logout } = useUserStore()

  const handleLogout = () => {
    logout()
  }

  const handleVisibleMenu = () => {
    setIsVisibleMenu(!isVisibleMenu)
  }

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-48'
      } bg-gray-200 p-4 bg-red-800 h-screen flex flex-col transition-width duration-500 absolute`}
    >
      <Link to="/">
        <div className="flex flex-row mb-5 relative">
          <img src="/logo.png" alt="" className="h-7 mr-2" />
          {!isCollapsed && (
            <h2 className="text-lg font-semibold py-0 text-white absolute left-7 top-2 text-yellow-400">
              Xiangqi
            </h2>
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <nav>
          <ul>
            <Link to="/play">
              <li className="flex flex-row py-3 gap-3">
                <img src="/icon/play-icon.png" alt="" className="h-7" />
                {!isCollapsed && <p className="font-bold text-white">Play</p>}
              </li>
            </Link>
          </ul>
        </nav>
        <div>
          <div
            className="flex flex-row py-2 gap-3 content-center"
            onClick={handleCollapse}
          >
            <HiLogout
              className={`text-white text-2xl place-self-center ${
                isCollapsed ? '' : 'transform rotate-180'
              }`}
            />
            {!isCollapsed && <p className="text-white">Collapse</p>}
          </div>
          <div
            className="flex flex-row py-2 gap-3 content-center"
            onClick={toggleTheme}
          >
            <MdLightMode className="text-white text-2xl place-self-center" />
            {!isCollapsed && (
              <p className="text-white whitespace-nowrap">
                {isDarkMode ? 'Dark mode' : 'Light Mode'}
              </p>
            )}
          </div>
          <div
            className="flex flex-row py-2 gap-3 content-center"
            onClick={handleVisibleMenu}
          >
            <FaRegUser className="text-white text-2xl place-self-center" />
            {!isCollapsed && <p className="text-white">Account</p>}
          </div>

          {isVisibleMenu && (
            <>
              <div className="absolute w-screen h-screen z-40 top-0 left-0" onClick={handleVisibleMenu}></div>
              <div className="absolute z-50 bottom-6 left-16 bg-white dark:bg-neutral-800 p-3 rounded-lg">
                <div className="flex flex-row py-2 gap-3 content-center">
                  <FaRegUserCircle className="dark:text-white text-2xl place-self-center" />
                  <p className="dark:text-white ">Profile</p>
                </div>
                <div className="flex flex-row py-2 gap-3 content-center">
                  <FaUserFriends className="dark:text-white text-2xl place-self-center" />
                  <p className="dark:text-white ">Friends</p>
                </div>
                <div
                  className="flex flex-row py-2 gap-3 content-center"
                  onClick={handleLogout}
                >
                  <TbLogout2 className="dark:text-white text-2xl place-self-center" />
                  <p className="dark:text-white ">Logout</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
