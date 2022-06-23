
  /* 
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
  |
  | Time component which returns the time
  |
  | This component gets current system time from the Date() method
  | from the JavaScript Library. It adds 0s properly when needed to
  | show the time in a 24 hour format properly
  | 
  | @param  date    none 
  | 
  | @return String  time
  */
const Time = ({weather}) => {
    var today = new Date()

    var diff = Math.round(weather['city']['timezone'] / 3600)
    console.log(diff);

    var time = ""

    if((today.getHours() + diff)<10 ){
      time += "0"
    }

    time += (today.getHours() +diff) + ':'
    // adds 0 before minutes if value < 10

    if(today.getMinutes() < 10){
      time += "0"
    } 
    time += today.getMinutes();

    
  return (
    <div>
        <p>
            {time}
        </p>
    </div>
  )
}

export default Time



