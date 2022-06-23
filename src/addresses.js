/* 
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 
  |
  | Page which shows the addresses which were searched in current session
  | 
  | The page shows the addresses which were searched by the user, and shows them
  | in a list
  | 
  | @param  None
  |
  | @return String
*/

import { render } from '@testing-library/react';
import React from 'react';
import clear from './assets/img/clearIcon.png'

function Addresses (){
    const addresses = JSON.parse(localStorage.getItem("Addresses")) || [];
    

  /* 
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 
  |
  | Clears all addresses from local storage and refreshes page
  | 
  | @param  None
  */
  function clearAddresses() {
      localStorage.removeItem("Addresses");
      window.location.reload(false);
  }

  /* 
  | @author Leena Neyazi <ec20300@qmul.ac.uk> | 200201188 
  |
  | Renders the recent addresses page with functionalities and the clear button
  | Recent addresses shows the addresses visited by fetching from JS LocalStorage
  */
  return (
    <div className="address-page">
    <main>
    <div>
      <h1>Recent Addresses</h1>
      <br/>

      {
        addresses.map((address)=>{
          return(<button className="address-box">{address}</button>)
        })
      }
    </div> 
    <div className='clearButtons'>
       <button id='clearButton' className='navButtons' onClick={clearAddresses}><img src={clear} alt="clear icon" height="17px" /> <br/>Clear</button>
    </div>
    </main>
    </div> 
  );
    }

export default Addresses;