import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './app/home'
import Login from './app/login'
import ProtectedRoute from './middleware/ProtectedRoute'
import NotFound from './app/notFound'
import Register from './app/register'
import PublicRoute from './middleware/PublicRoute'
import userStore from './zustand/userStore'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import MainLayout from './app/layouts/MainLayout'
import Play from './app/home/play'


function App() {

  const { setToken, isLoggedIn, logout, fetchUser } = userStore()
  useEffect(() => {
    // Only check login status on initial mount
    if (!isLoggedIn) {
      const checkLoggedInStatus = async () => {
        try {
          const token = Cookies.get('token')
          const tokenType = Cookies.get('tokenType')
          const isLoggedInCookie = Cookies.get('isLogged') === 'true'
          
          if (isLoggedInCookie && token && tokenType) {
            await setToken(token, tokenType)
            await fetchUser()
          } else {
            console.log("abc")
          }
        } catch (error) {
          console.error('Error checking login status:', error)
          logout()
        }
      }
      checkLoggedInStatus()
    }
  }, [isLoggedIn, setToken, logout])

  return (
    <Router>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<PublicRoute element={Login} isAuth={isLoggedIn} />} />
      <Route path="/register" element={<PublicRoute element={Register} isAuth={isLoggedIn} />} />
      <Route path="/" element={<ProtectedRoute isAuth={isLoggedIn} element={<MainLayout><Home /></MainLayout>} />}/>
      <Route path="/play" element={<ProtectedRoute isAuth={isLoggedIn} element={<MainLayout><Play /></MainLayout>} />}/>
    </Routes>
  </Router>
  )
}

export default App
