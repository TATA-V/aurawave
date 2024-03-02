import { useState, useEffect } from "react";

const useGetWeather = () => {
  const [weather, setWeather] = useState<any>();

  useEffect(() => {
    const getWeather = (lat: number, lon: number) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=kr`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    };
  
    const success = (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon);
    };
  
    const error = (err: { code: number; message: string; }) => {
    };
  
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return {
    weather
  }
}

export default useGetWeather;