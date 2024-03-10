import React, { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=yltLSRn6jlv1nYzbzHZszS9cmYKYEOS5`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
        })
        .catch(err => {
          setError(err);
          console.error(err);
        });
    }
  };

  useEffect(() => {
    // Fetching New York data initially
    fetch('https://api.tomorrow.io/v4/weather/forecast?location=new%20york&apikey=yltLSRn6jlv1nYzbzHZszS9cmYKYEOS5')
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(err => {
        setError(err);
        console.error(err);
      });
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        {weatherData && (
          <div className="top">
            <div className="location">
              <p>{weatherData.location ? weatherData.location.name : 'City'}</p>
            </div>
            <div className="temp">
              <h1>{weatherData.timelines && weatherData.timelines.minutely && weatherData.timelines.minutely[0].values.temperature.toFixed()}°F</h1>
            </div>
            <div className="bottom">
              <p className='humidity'>{weatherData.timelines && weatherData.timelines.minutely && weatherData.timelines.minutely[0].values.humidity}%<br></br> Humidity </p>
              <p className='time'>{new Date(weatherData.timelines && weatherData.timelines.minutely && weatherData.timelines.minutely[0].time).toLocaleTimeString()}</p>
              <p className='wind'>{weatherData.timelines && weatherData.timelines.minutely && weatherData.timelines.minutely[0].values.windSpeed.toFixed()} MPH<br></br> Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
