import { useState, useEffect } from 'react'
import yelp from '../api/yelp'

export default () => {
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 })

  const searchApi = async (searchTerm) => {
    console.log('hi there')
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          latitude: coords.latitude,
          longitude: coords.longitude
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
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude } = position.coords
      setCoords({
        latitude,
        longitude
      })
    }, (err) => {
      setErrorMessage(err.message)
    }, {
      enableHighAcurracy: true,
      timeout: 20000,
      maximumAge: 60 * 1000
    })
    searchApi('Pasta')
  }, [])
  return [searchApi, results, errorMessage]
}
