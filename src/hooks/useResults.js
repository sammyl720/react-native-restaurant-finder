import { useState, useEffect } from 'react'
import yelp from '../api/yelp'

export default () => {
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const searchApi = async (searchTerm) => {
    console.log('hi there')
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'crown heights'
        }
      })
      setResults(response.data.businesses)
      // console.log(response.data.businesses[0])
    } catch (err) {
      // console.log(err)
      setErrorMessage('Something went wrong')
    }
  }

  // Call searchApi when components
  // is first rendered
  // searchApi('Pizza')

  useEffect(() => {
    searchApi('Pasta')
  }, [])
  return [searchApi, results, errorMessage]
}
