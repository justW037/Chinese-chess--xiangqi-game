import { useState, useEffect } from 'react'
import axios from 'axios'

interface ApiCountry {
  cca2: string
  name: {
    common: string
  }
  flags: {
    png: string
  }
}

interface Country {
  code: string
  name: string
  flag: string
}

const useFetchCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true)
      try {
        const response = await axios.get<ApiCountry[]>(process.env.REACT_APP_COUNTRY_API_URL || '')
        const countryData = response.data
          .map(country => ({
            code: country.cca2,
            name: country.name.common,
            flag: country.flags.png
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
        setCountries(countryData)
      } catch (error) {
        setError('Error fetching country data')
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return { countries, loading, error }
}

export default useFetchCountries
