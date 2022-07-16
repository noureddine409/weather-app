import { WEATHER_API_URL, API_KEY } from './api';
import './App.css';
import { useState } from "react"
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forcast from './components/forcast/Forcast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcast, setForecast] = useState(null);
  const handleOnSeachChange = (searchData) => {
    const [lat, long] = searchData.value.split(" ")
    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
    const ForcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
    Promise.all([CurrentWeatherFetch, ForcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  }
  
  console.log(forcast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSeachChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forcast && <Forcast data={forcast}/>}
    </div>
  );
  }

export default App;
