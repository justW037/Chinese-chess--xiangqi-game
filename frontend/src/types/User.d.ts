interface User {
    id: number
    name: string
    email: string
    role: string 
    dob: [number, number, number] 
    country: string
}

interface UserState {
    user: User | null
    isLoggedIn: boolean
    token: string | null
    tokenType: string | null
    setUser: (user: User) => void
    setToken: (token: string, tokenType: string) => void
    logout: () => void
    login: (email: string, password: string) => void
    fetchUser: () => void
}