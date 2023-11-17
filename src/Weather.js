import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default to Celsius

  const getWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=30e8497ecd2f79116b4fe255ebeafac5`
      );

      setWeatherData(response.data);
    } catch (error) {
      setError('City not found. Please enter a valid city name.');
    } finally {
      setLoading(false);
    }
  };

  const getForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=YOUR_API_KEY`
      );

      // Assuming the forecast data is available in response.data.list
      // Adjust this based on the actual structure of the API response
      setWeatherData((prevData) => ({
        ...prevData,
        forecast: response.data.list,
      }));
    } catch (error) {
      console.error('Error fetching forecast:', error);
    }
  };

  const switchUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  useEffect(() => {
    getWeather();
    getForecast();
  }, [unit, city]); // Re-run the effect when 'unit' or 'city' changes

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
        return faSun;
      case '01n':
        return faSun;
      case '02d':
        return faCloud;
      case '02n':
        return faCloud;
      case '03d':
      case '03n':
        return faCloud;
      case '04d':
      case '04n':
        return faCloud;
      case '09d':
      case '09n':
        return faCloudShowersHeavy;
      case '10d':
      case '10n':
        return faCloudShowersHeavy;
      // Add more cases for other weather conditions as needed
      default:
        return faSun; // Default to a sun icon
    }
  };

  return (
    <div className='outer-wrapper'>
    <div className='inner-wrapper'>
        
      <h2 id='labelName'>Weather App</h2>
      <div className='weather-app'>
        <input
            type="text"
            className='form-control'
            id='city'
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
        />
        <button className='btn btn-weather' onClick={getWeather}>
            Get Weather
        </button>
        <button className='btn btn-unit' onClick={switchUnit}>Switch Unit</button>
      </div>
      {loading && <p>Loading...</p>}

      {<p className='error'>{error}</p>}

      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>
            <FontAwesomeIcon icon={getWeatherIcon(weatherData.weather[0].icon)} />
            Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Weather;