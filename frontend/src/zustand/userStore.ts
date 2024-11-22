import axios from 'axios'
import Cookies from 'js-cookie'
import { create } from 'zustand'

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  token: null,
  tokenType: null,
  setUser: () => {},
  setToken: () => {},
  logout: () => {},
  login: () => {},
  fetchUser: () => {}
}

const useUserStore = create<UserState>(set => ({
  ...initialState,
  setUser: (user: User) => set({ user }),
  setToken: (token: string, tokenType: string) => {
    set({ token, tokenType, isLoggedIn: true })
  },
  logout: () => {
    set(initialState)
    Cookies.remove('token')
    Cookies.remove('tokenType')
    Cookies.remove('refreshToken')
    Cookies.remove('isLogged')
  },
  login: async (email: string, password: string)  => {
    try {

      const response = await axios.post(
        process.env.REACT_APP_API_URL + `/users/login`,
        { email, password }
      )
      const {
        token,
        refresh_token: refreshToken,
        token_type: tokenType
      } = response.data
      set({ token, tokenType, isLoggedIn: true })
      Cookies.set('token', token, { expires: 30 })
      Cookies.set('tokenType', tokenType, { expires: 30 })
      Cookies.set('refreshToken', refreshToken, { expires: 30 })
      Cookies.set('isLogged', String(true), { expires: 30 })
     return response.data
    } catch (error) {
      
      console.error('Login failed:', error)
    }
  },
  fetchUser: async () => {
    const { token, tokenType, setUser } = useUserStore.getState()
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `/users/details`, {
        headers: { Authorization: `${tokenType} ${token}` }
      })
      if (response.status === 200) {
        const userDetails = response.data
        setUser(userDetails)
      } else {
        console.error('Failed to fetch user data:', response.status)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } 
  }
}))

export default useUserStore
