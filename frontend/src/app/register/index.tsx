import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../components/ThemeContext'
import useFetchCountries from '../../hooks/useFetchCountries'
import useDebounce from '../../hooks/useDebounce'
import InputField from '../../components/ui/InputField'

const RegisterScreen = React.memo(() => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [retypePassword, setRetypePassword] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [showDropdown, setShowDropdown] = useState(false)
  const { countries } = useFetchCountries()
  const { isDarkMode } = useTheme()

  const debouncedUsername = useDebounce(username, 100)
  const debouncedEmail = useDebounce(email, 100)
  const debouncedPassword = useDebounce(password, 100)
  const debouncedRetypePassword = useDebounce(retypePassword, 100)
  const debouncedDob = useDebounce(dob, 100)

  const handleCountrySelect = useCallback((code: string) => {
    setCountry(code)
    setShowDropdown(false)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic
  }, [])

  return (
    <div
      className="flex items-center justify-center min-h-screen scrollbar-hide"
      style={{
        backgroundImage: isDarkMode ? "url('/dbg.jpg')" : "url('/bg.png')",
        backgroundSize: 'cover'
      }}
    >
      <div className="bg-green-50 dark:bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register for Xiangqi Game
        </h2>
        <div className="flex flex-row justify-around mb-3">
          <Link to="/login">
            <p className="py-2 px-4 text-lg font-semibold dark:text-white">
              Login
            </p>
          </Link>
          <p className="py-2 px-4 text-lg font-semibold border-b-4 border-black dark:border-zinc-400 dark:text-white">
            Register
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={debouncedUsername}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={debouncedEmail}
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={debouncedPassword}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <InputField
            id="retype-password"
            label="Retype Password"
            type="password"
            placeholder="Enter your retype password"
            value={debouncedRetypePassword}
            onChange={e => setRetypePassword(e.target.value)}
            required
          />
          <div className="mb-4 flex flex-row justify-between">
            <div>
              <label
                htmlFor="dob"
                className="block text-gray-700 font-medium mb-2 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black dark:bg-zinc-700 dark:text-white dark:border-zinc-500 dark:focus:border-zinc-200"
                value={debouncedDob}
                onChange={e => setDob(e.target.value)}
                required
              />
            </div>
            <div className="relative w-1/2">
              <label
                htmlFor="country"
                className="block text-gray-700 font-medium mb-2 dark:text-white"
              >
                Country
              </label>
              <div
                className="w-full p-2 border border-gray-300 rounded cursor-pointer dark:bg-zinc-700 dark:text-white dark:border-zinc-500"
                onClick={() => setShowDropdown(prev => !prev)}
              >
                {country
                  ? countries.find(c => c.code === country)?.name
                  : 'Select Country'}
              </div>
              {showDropdown && (
                <div
                  className="absolute bg-white border border-gray-300 rounded max-h-64 overflow-y-auto z-10 w-full dark:bg-zinc-700 dark:text-white dark:border-zinc-500"
                  style={{ bottom: '80%' }}
                >
                  {countries.map(country => (
                    <div
                      key={country.code}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="w-4 h-4 mr-2"
                      />
                      {country.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-2 rounded hover:bg-yellow-950 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
})

export default RegisterScreen
