
import React from 'react';
import { useState } from 'react';
import Addresses from './addresses';
import { Link } from 'react-router-dom';


// importing images
import warning from './assets/img/warning.png'
import windspeed from './assets/img/windspeed.png'
import precipitation from './assets/img/precipitation.png'
import visibilty from './assets/img/visibility.png'
import alarm from './assets/img/alarm.png'
import recent from './assets/img/history.png'
import tips from './assets/img/information-button.png'

// importing components
import Time from './components/Time'
import Popup from './components/Popup';

const api = {
  key: "f767386989a756ea74c86a01258d3664",
  base: "https://api.openweathermap.org/data/2.5/"
}

/*
* @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
*
* Main Home screen function which renders the Application's homepage
*
* The function consists of all the components of the application combining
* the openweathermap API included above and renders each component to show
* the homepage of weather weather application with different weather details
*
* @param  None
*
* @return app-screen
*/
function Home() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const [buttonPopup, setButtonPopup] = useState(false);

    /*
    | @author Lawko Saman  <ec20390@qmul.ac.uk>      | 200325473
    | 
    | Activates weather alarm if current weather matches the current alarm
    |
    | @param  JSON    weather
    |
    */
    const alarmActivate = (weather) => {
      var currentAlarm = localStorage.getItem("Alarm") || "None";
      if(weather['list'][0]['weather'][0]['main'] == currentAlarm) {
        console.log("ALERT Weather alarm: " + currentAlarm);
        window.alert("ALERT Weather alarm: " + currentAlarm);
        localStorage.removeItem("Alarm");
      };
    }

      /*
    | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
    | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 
    |
    | Setting the weather in JSON format using the openweathermap API
    |
    | Calls the API to fetch the JSON file from openweathermap.org
    | and then sets the value of weather to the acquired JSON file
    |
    */
    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            addRecentAddress(result.city.name);
            setQuery('');
            console.log(result);       
          });
      }
    }

      /*
    | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 
    |
    | Adding address to local Storage
    |
    | Uses the JavaSciript persistent storage called localStorage
    | to store the searched address if it satisfies certain conditions
    |
    */
    const addRecentAddress = (name) => {
      let addresses = localStorage.getItem("Addresses") || '[]';
      addresses = JSON.parse(addresses);
      if (addresses.includes(name) === false) {
        if (addresses.length == 10) {
          addresses.splice(0, 1);
        }
        addresses.push(name);
        localStorage.setItem("Addresses", JSON.stringify(addresses));
      }
    }

    /*
    | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
    |
    | dateBuilder builds the Date output in required format by using the preferred
    | string format of current date
    |
    | @param  date    d
    |
    | @return String  output
    */
    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May","June", "July", "August",
      "September" ,"October", "November", "December"]
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]

      let day = days[d.getDay()];
      let date = d.getDate();
      let th = nth(d.getDate());
      let month = months[d.getMonth()];

      let output = `${day} ${date}${th} ${month}`
      return output
    }


  /*
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
  |
  | The function accepts a JSON file and parses to check the weather of a
  | specific time, and it returns true if it is one of the following: Snow,
  | Extreme, Thunderstorm, Tornado, Squall.
  | Details about the specific weather types be found at :
  | https://openweathermap.org/weather-conditions
  |
  | @param  JSON    weather
  |
  | @return bool
  */

    const weatherWarningBool = (weather) => {
      if(
        weather['list'][5]['weather'][0]['main'] === 'Snow'||
        weather['list'][5]['weather'][0]['main'] === 'Extreme' ||
        weather['list'][5]['weather'][0]['main'] === 'Thunderstorm' ||
        weather['list'][5]['weather'][0]['main'] === 'Tornado' ||
        weather['list'][5]['weather'][0]['main'] === 'Squall'
        ){
          return true
        }else{
          return false
        }
    }

  /*
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
  |
  | The function accepts a JSON file calls weatherWarningBool function
  | and returns a text about current weather warning based on results
  |
  | @param  JSON    weather
  |
  | @return String
  */
    const weatherWarningText = (weather) =>{
      if(weatherWarningBool(weather)){
        return "Incoming extreme weather: "+ weather['list'][5]['weather'][0]['main'] + "!"
      }else{
        return "No warnings for now..."
      }
    }

  /*
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
  |
  | The function accepts a JSON file calls weatherWarningBool function
  | and returns a text about current weather warning based on results
  |
  | @param  JSON    weather
  |
  | @return ./assets/img/warning-logo.png
  */
    const weatherWarningLogo = (weather) => {
        if(weatherWarningBool(weather)){
          return <img src={warning} alt='warning-logo' height='40px'/>
        }
    }


    /*
    | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
    |
    | The function returns the nth corresponding letter for the respective date
    | which is passed in the argument
    |
    | @param  date    d
    |
    | @return String  output
    */
    const nth = function(d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }


      /*
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
  |
  | Returns recommendation based on current weather of the location
  |
  | @param  JSON    weather
  |
  | @return String 
  */
    const weatherRecommendations =(weather) => {
      console.log(weather.city)
      if((typeof (weather.city) === "undefined")){
        return "Current weather not found"
      }
      else if(weather['list'][0]['weather'][0]['main'] == 'Clear'){
        return "It is a good time to work on crops, as the weather is good and clear!"
      }
      else if(weather['list'][0]['weather'][0]['main'] == 'Clouds'){
        return "It's a bit cloudy, so it is safe to work, but be careful about rains"
      }
      else if(weather['list'][0]['weather'][0]['main'] == 'Snow'){
        return "It's snowing outside, so prepare to protect your crops!"
      }
      else if(weather['list'][0]['weather'][0]['main'] == "Thunderstorm"){
        return "A thunderstorm is going on, so stay at home."
      }
      else if(weather['list'][0]['weather'][0]['main'] == "Drizzle"){
        return "It's drizzling right now, so take your jacket with you if you are visiting your farms"
      }
      else{
        return "Be careful, currently "+ weather['list'][0]['weather'][0]['main'] + " is happening!"
      }
    }

          /*
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
  |
  | returns the type of background required as classname depending on current weather
  |
  | @param  JSON    weather
  |
  | @return String 
  */
  const appBackground =(weather) => {
    console.log(weather.city)

    if(weather['list'][0]['weather'][0]['main'] == 'Clear'){
      return "app-sunny"
    }
    else if(weather['list'][0]['weather'][0]['main'] == 'Clouds'){
      return "app-cloudy"
    }
    else if(weather['list'][0]['weather'][0]['main'] == 'Snow'){
      return "app-snow"
    }
    else if(weather['list'][0]['weather'][0]['main'] == "Thunderstorm"){
      return "app-thunder"
    }
    else if(weather['list'][0]['weather'][0]['main'] == "Drizzle"){
      return "app-drizzle"
    }
    else if(weather['list'][0]['weather'][0]['main'] == "Rain"){
      return "app-rainy"
    }
    else{
      return "app-badweather"
    }
  }

  


    /*
    | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417 - Search, Weather conditions and forecast
    | @author Lawko Saman  <ec20390@qmul.ac.uk>      | 200325473 - Weather Alarm
    |
    | This section renders the main screen of the weather app, which includes
    | a searchbar, current address and temperature, time, weather warning summary,
    | current weather components such as windspeed, precipitation, and visibility
    |
    |
    */
    return (
        <div id='website'>

      {/* shows weather details if location is set, otherwise only searchbar */}
      {/* Sets background based on weather conditions */}
      <div className={(typeof (weather.city) != "undefined") ? appBackground(weather) : 'app-default'}>
          <main>
          {/* search box which sends query to the API */}
            <div className='search-box'>
              <input
              type='text'
              className="search-bar"
              placeholder="Search Address"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}

              />
            </div>
            {/* Shows weather alarm icon */}
             <div className="recent">
              <Link to="/addresses">
                <img src={recent} alt="Recent addresses logo"/>
              </Link>
              <h3 className="recent-text"> Recent <br /> Addresses </h3>
            </div>

            {(typeof (weather.city) != "undefined") ? (


              <div>
              {/* Shows the current address and date */}
                <div className="location-box">
                  <div className="location">
                    <div id='curr-add-text'>
                      <p>Current Address</p>
                    </div>
                    {weather['city']['name']}, {weather['city']['country']}
                  </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>

              {/* Shows weather alarm icon */}
                <div className="alarm">
                  <Link to="/alarms">
                    <img src={alarm} alt="Alarms logo"/>
                  </Link>
                  <h3 className="alarm-text"> Weather <br /> Alarms </h3>
                </div>

                <div className="weather-box">

                {/* Shows current temperature and weather */}
                  <div className="temp">
                    <div className='current-temp'>
                      <p className='current-degree'>
                        {Math.round(weather['list'][0]['main']['temp'])}°
                      </p>
                      Celsius
                    </div>

                    <p>

                    </p>
                      <div id='weather-type'>
                      <img src={`http://openweathermap.org/img/wn/${weather['list'][0]['weather'][0]['icon']}@2x.png`} alt='warning-logo' height='85px'/>
                        <p className='weather-type-text'>
                          {weather['list'][0]['weather'][0]['main']}
                        </p>
                    </div>

                  {/* Showing the system time */}
                  </div>
                  <div className="time">
                    <Time weather={weather}/>
                  </div>

                  <br></br>
                  {/* Weather warning section */}
                  <div className='weather-warning'>
                    <div className='warning-logo'>
                      {weatherWarningLogo(weather)}
                    </div>
                    <div className='warning-text'>
                      WEATHER <br></br>
                      WARNING:
                    </div>
                    <div className='warning-details'>
                        {weatherWarningText(weather)}
                    </div>
                  </div>

                  {/* Weather components section */}
                  <div className='weather-components'>
                    <div className='comp-windspeed'>
                      <img src={windspeed} alt='windspeed-logo' height='65px'/>
                      <p className='windspeed-text'>Windspeed</p>
                      <p className='windspeed-data'>
                        {weather['list'][0]['wind']['speed']} KM/h
                      </p>
                    </div>
                    <div className='comp-precipitation'>
                      <img src={precipitation} alt='precipitation-logo' height='65px'/>
                        <p className='precipitation-text'>Precipitation</p>
                        <p className='precipitation-data'>
                          {weather['list'][0]['pop']} %
                        </p>
                    </div>
                    <div className='comp-visibility'>
                      <img src={visibilty} alt='visibility-logo' height='65px'/>
                        <p className='visibility-text'>Visibility</p>
                        <p className='visibility-data'>
                          {(weather['list'][0]['visibility'])/1000} KM
                        </p>
                    </div>

                  </div>

                  {/* Forecasts section */}
                  <div className='weather-forecast'>
                  <div className='forecast-1'>
                    <img src={`http://openweathermap.org/img/wn/${weather['list'][1]['weather'][0]['icon']}@2x.png`} alt='warning-logo' height='80px'/>
                    <p>{Math.round(weather['list'][1]['main']['temp'])}°</p>
                    <p>+3 Hr</p>
                  </div>
                  <div className='forecast-2'>
                    <img src={`http://openweathermap.org/img/wn/${weather['list'][2]['weather'][0]['icon']}@2x.png`} alt='warning-logo' height='80px'/>
                    <p>{Math.round(weather['list'][2]['main']['temp'])}°</p>
                    <p>+6 Hr</p>
                  </div>
                  <div className='forecast-3'>
                    <img src={`http://openweathermap.org/img/wn/${weather['list'][3]['weather'][0]['icon']}@2x.png`} alt='warning-logo' height='80px'/>
                    <p>{Math.round(weather['list'][3]['main']['temp'])}°</p>
                    <p>+9 Hr</p>
                  </div>
                  <div className='forecast-4'>
                    <img src={`http://openweathermap.org/img/wn/${weather['list'][4]['weather'][0]['icon']}@2x.png`} alt='warning-logo' height='80px'/>
                    <p>{Math.round(weather['list'][4]['main']['temp'])}°</p>
                    <p>+12 Hr</p>
                  </div>

                  </div>

                  {/* If weather = alarm */}
                  {alarmActivate(weather)}

                </div>

              </div>
            ): ('')}

            <div className='tipsButtons'>
              
              <button id='tipsButton' className='navButtons' onClick={() => setButtonPopup(true)}><img src={tips} alt="tips icon" height="17px" /> <br/>Tips</button>
          </div>
            <Popup trigger= {buttonPopup} setTrigger={setButtonPopup}>
                <h3><b>Weather Recommendations</b></h3>
                {weatherRecommendations(weather)}

            </Popup>
          </main>
        </div>
      </div>
    );
  }

  export default Home;
