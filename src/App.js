
import './App.scss';
import React, { useState } from 'react';
import axios from 'axios';


function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=355785fba6b6e2ccffa342c39b0dc39a&units=imperial`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })

      setLocation('')
    }

  }

  return (
    <div className="App">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type='text' />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}&deg;F</h1> : null}
          </div>
          <div className='descreiption'>
            {data.weather ? <p> {data.weather[0].main}</p> 
            : null}
            <div className='icon'>
            {data.weather ? <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt=""></img>:null}
            
            </div>
          </div>
        </div>
        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feels'>
              <p className='bold-header'> Feels Like</p>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}&deg;F</p> : null}          </div>
            <div className='humidity'>
              <p className='bold-header'>Humidity</p>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}          </div>
            <div className='wind'>
              <p className='bold-header'>Wind Speed</p>
              {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}           </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
