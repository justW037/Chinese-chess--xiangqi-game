import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../components/ThemeContext'

import useDebounce from '../../hooks/useDebounce' // Assume you have a debounce hook
import InputField from '../../components/ui/InputField'
import useUserStore from '../../zustand/userStore'

const LoginScreen = React.memo(() => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { isDarkMode } = useTheme()
  const debouncedEmail = useDebounce(email, 100)
  const debouncedPassword = useDebounce(password, 100)

  const { login, fetchUser } = useUserStore()

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      await login(debouncedEmail, debouncedPassword)
      await fetchUser()
    },
    [debouncedEmail, debouncedPassword, login]
  )

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: isDarkMode ? "url('/dbg.jpg')" : "url('/bg.png')",
        backgroundSize: 'cover'
      }}
    >
      <div className="bg-green-50 dark:bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login to Xiangqi Game
        </h2>
        <div className="flex flex-row justify-around mb-3">
          <p className="py-2 px-4 text-lg font-semibold border-b-4 border-black dark:border-zinc-400 dark:text-white">
            Login
          </p>
          <Link to="/register">
            <p className="py-2 px-4 text-lg font-semibold dark:text-white">
              Register
            </p>
          </Link>
        </div>
        <form onSubmit={handleLogin}>
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your username"
            value={debouncedEmail}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={debouncedPassword}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-2 rounded hover:bg-yellow-950 focus:outline-none dark:bg-white dark:text-black dark:hover:bg-yellow-100 dark:focus:bg-yellow-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
})

export default LoginScreen
