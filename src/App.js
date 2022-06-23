/*
* ECS522U -Graphical User Interface
* Assignment 2
* Lab 3 Group 4
*
* React Weather App for Farmers
* Developed in:
* node    v16.14.0
* npm     v8.3.1
* VSCode  v1.65.1
* Contributors for this project: Abdullah Al Asif, Lawko Saman, Leena Neyazi
*
* API Used: Openweathermap Forecast API
* Weather icons and images from Openweathermap and royalty free websites such as pngtree, pexels, flaticon etc.
*/

// importing libraries and stylesheets
import './reset.css';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Addresses from './addresses';
import Alarms from './alarms';
import Home from './home';

// importing components
import Time from './components/Time'

// importing images

import alarm from './assets/img/alarm.png'
import back from './assets/img/backButton.png'
import home from './assets/img/homeButton.png'
import tips from './assets/img/bulb.png'

const api = {
  key: "YOUR-API-KEY", // replace YOUR-API_KEY from an api key you've got from OpenWeatherMap
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  /*
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417 - Home page and internals of homepage and navigation
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 - Routing, Alarms and Addresses page and its internals
  | @author Lawko Saman  <ec20390@qmul.ac.uk> | 200325473 - Addresses page and its internals
  |
  | This section renders the screens of the weather app
  | 
  |
  | This uses React Routing v5 to switch between different pages within the webapp
  |
  */
  return (


    <Router>
    <div>
      <Switch>

        {/*Home screen - loads search bar and weather info if a location is set*/ }
        <Route exact path="/">
          <Home />
        </Route>

        {/*Weather Alarms section*/}
        <Route exact path="/alarms"> 
          <Alarms />
        </Route>

        {/*Recent addresses section*/}
        <Route exact path="/addresses">
            <Addresses />
        </Route>

      </Switch>
    </div>

    {/* Navigation Bar section */}
    <nav className='navbar'>
        <Link to='/'>
          <button  id='backButton' className='navButtons'> 
            <img src={back} alt="Back icon" width="20px" /> <br/>Back
          </button>
        </Link>
        <Link to='/'>
          <button id='homeButton' className='navButtons'>
            <img src={home} alt="Back icon" width="20px" /> <br/>Home
          </button>
        </Link>
        
    </nav>

  </Router>
  );
}

export default App;
