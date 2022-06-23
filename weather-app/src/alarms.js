/*
  | @author Lawko Saman  <ec20390@qmul.ac.uk> | 200325473 - Core Internal Structure and functionality
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 - Initial Routed Page, Local Storage, and Clear functionality
  |
  |
  | Page where user can set alarms for the weather
  |
  | The page allows setting of alarms of desired weather conditions such as
  | Sunny, Cloudy, Windy, Rainy, Thunderstorm, or Snowfall weather
  |
  |
*/

import './reset.css';
import './alarms.css';
/* Import images */
import sunny from './assets/img/sunny.png'
import cloudy from './assets/img/cloudyIcon.png'
import windy from './assets/img/windy weather.png'
import rainy from './assets/img/rain.png'
import thunderstorm from './assets/img/thunderstorm.png'
import snowfall from './assets/img/snowy.png'
import clear from './assets/img/clearIcon.png'
/* Import component */
import weather from './home.js'
import React from 'react';
import { useState } from 'react';

/*
| @author Lawko Saman  <ec20390@qmul.ac.uk> | 200325473
| @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188
|
| This section renders the weather alarm screen of the weather app, where
| user can select the desired weather condition to set alarm for
|
*/
function Alarms (){
  const [weather, setWeather] = useState({});
  const currentAlarm = localStorage.getItem("Alarm") || "None";

  /*
  | @author Lawko Saman  <ec20390@qmul.ac.uk> | 200325473 
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 
  |
  | Changes the current alarm
  | 
  | @param  None
  */
  const setsCurrent = (tobeset) => {
    localStorage.setItem("Alarm", tobeset);
    document.getElementById('currentAlarm').innerHTML="Current Alarm: " + tobeset
  }

  /* 
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188  
  |
  | Clears current alarm and refreshes page
  | 
  | @param  None
  */
  function clearAlarm() {
    localStorage.removeItem("Alarm");
    window.location.reload(false);
  }


    /* 
  | @author Lawko Saman  <ec20390@qmul.ac.uk> | 200325473 - core components
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 - clear button
  |
  | Clears current alarm and refreshes page
  | 
  | @param  None
  */
    return (
      <div className={(typeof (weather.city) != "undefined") ? ((weather['list'][0]['main']['temp'] > 16) ? 'app warm' : 'app'): 'app'}>
        <main>
        {/* Header */}
        <h1>Weather Alarms</h1>

        {/* Current alarm */}
        <div className="current-alarm">
          <h2 id="currentAlarm">Current Alarm:  {currentAlarm}</h2>
        </div>

        {/* Text telling user to select alarm */}
        <div className="select-alarm">
          <h1>Select Weather Alarm</h1>
        </div>

        {/* List of alarm options to choose from */}
        <div className="alarm-list">
          <img src={sunny} alt="Sunny logo" id="sunny" onClick={() => setsCurrent("Clear")} width="125" height="100"/>
          <h2 id="sunnyText">Clear</h2>
          <img src={cloudy} alt="Cloudy logo" id="cloudy" onClick={() => setsCurrent("Clouds")} width="125" height="100"/>
          <h2 id="cloudyText">Clouds</h2>
          <img src={windy} alt="Windy logo" id="windy" onClick={() => setsCurrent("Windy")} width="125" height="100"/>
          <h2 id="windyText">Windy</h2>
          <img src={rainy} alt="Rainy logo" id="rainy" onClick={() => setsCurrent("Rain")} width="125" height="100"/>
          <h2 id="rainyText">Rainy</h2>
          <img src={thunderstorm} alt="Thunderstorm logo" id="thunderstorm" onClick={() => setsCurrent("Thunderstorm")} width="125" height="100"/>
          <h2 id="thunderstormText">Thunderstorm</h2>
          <img src={snowfall} alt="Snowfall logo" id="snowfall" onClick={() => setsCurrent("Snow")} width="125" height="100"/>
          <h2 id="snowfallText">Snowfall</h2>
        </div>
        {/* Clear button to clear current alarm */}
        <div className='clearButtons'>
          <button id='clearButton' className='navButtons' onClick={clearAlarm}><img src={clear} alt="clear icon" height="17px" /> <br/>Clear</button>
        </div>
      </main>
    </div>
    );
}
export default Alarms;
