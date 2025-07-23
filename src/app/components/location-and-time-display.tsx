import { useState, useEffect } from 'react'

interface IGeoLocationPosition {
  coords: {
    latitude: number
    longitude: number
    accuracy: number
    altitute: number | null
    altitudeAccuracy: number | null
    heading: number | null
    speed: number | null
  }
  timestamp: number
}

interface IGeoLocationPOsitionError {
  code: number
  message: string
  PERMISSION_DENIED: number
  PERMISSION_UNAVAILABLE: number
  TIMEOUT: number
}

export function LocationAndTimeDisplay() {
  const [ time, setTime ] = useState<string>('')
  const [ latitude, setLatitude ] = useState<number | null>(null)
  const [ longitude, setLongitude ] = useState<number | null>(null)

  const [ error, setError ] = useState<string | null>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  useEffect(() => { 
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
    }, 1000)

    function HandleSuccessRequest(position: IGeoLocationPosition) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

      setIsLoading(false)
    }

    function HandleError(error: IGeoLocationPOsitionError) {
      let errorMessage = ''
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'User denied the request for geolocation.'
          break;
        case error.PERMISSION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.'
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get user location timed out.'
          break;
        default:
          errorMessage = 'An unknown error occurred.'
      }

      setError(errorMessage)
      setIsLoading(false)
    }

    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(HandleSuccessRequest, HandleError)
    } else {
      setError('Geolocation is not supported by your browser.')
      setIsLoading(false)
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

   if (isLoading) {
    return <div>Loading location data...</div>
  }

  return (
    <div>
      {error ? (
        <p className='font-bold text-sm'>{error}</p>
      ) : (
        <div className='flex items-center gap-3'>
          <span>Current Location 📍</span>
          <div className='flex items-baseline gap-1.5'>
            <span className='text-xs tracking-widest'>&#47;&#47; <strong>Local Time:</strong> </span>
            <span className='text-sm tracking-wider'>{time}</span>
          </div>
          {latitude && longitude && (
            <div className='flex items-baseline gap-1.5'>
              <span className='text-xs tracking-widest'>&#47;&#47; <strong>Coordinates:</strong> </span>
              <span className='text-sm tracking-wider'>{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}