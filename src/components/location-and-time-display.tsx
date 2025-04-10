import { useState, useEffect } from 'react';

interface GeolocationPosition {
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

interface GeolocationPositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}

export function LocationTimeDisplay() {
  const [time, setTime] = useState<string>('')
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);

    function HandleSuccessReq(position: GeolocationPosition) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      setIsLoading(false)
    };

    function HandleError(err: GeolocationPositionError) {
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
    <div className="location-time-display">
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div>
            <span className='font-bold'>// Local Time: </span>
            <span>{time}</span>
          </div>
          {latitude && longitude && (
            <div className='ml-2'>
              <span className='font-bold'>// Coordinates: </span>
              <span>{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}