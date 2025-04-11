import { useState, useEffect } from 'react';

interface IGeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

interface IGeolocationPositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

export function LocationTimeDisplay() {
  const [ time, setTime ] = useState<string>('')
  const [ latitude, setLatitude ] = useState<number | null>(null)
  const [ longitude, setLongitude ] = useState<number | null>(null)

  const [ error, setError ] = useState<string | null>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString())
    }, 1000)

    function HandleSuccessReq(position: IGeolocationPosition) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

      setIsLoading(false)
    }

    function HandleError(err: IGeolocationPositionError) {
      let errorMessage = ''
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'User denied the request for geolocation.'
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.'
          break;
        case err.TIMEOUT:
          errorMessage = 'The request to get user location timed out.'
          break;
        default:
          errorMessage = 'An unknown error occurred.'
      }

      setError(errorMessage);
      setIsLoading(false);
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(HandleSuccessReq, HandleError)
    } else {
      setError('Geolocation is not supported by your browser.')
      setIsLoading(false)
    }

    return () => {
      clearInterval(timer)
    };
  }, []);

  if (isLoading) {
    return <div>Loading location data...</div>
  }

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div>
            <span className='font-bold text-sm tracking-widest'>// Local Time: </span>
            <span className='text-md tracking-widest'>{time}</span>
          </div>
          {latitude && longitude && (
            <div className='ml-2'>
              <span className='font-bold text-sm tracking-widest'>// Coordinates: </span>
              <span className='text-md tracking-widest'>{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}