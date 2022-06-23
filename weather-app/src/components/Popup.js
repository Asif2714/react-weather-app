
  /*
  | @author Abdullah Al Asif  <ec20829@qmul.ac.uk> | 200794417
  |
  | Creates a popup dialogue and has a close button
  | 
  | @param  props
  |
  | @return diagloue_box_popup
  */
import './Popup.css'

function Popup(props) {
  return (props.trigger) ? (

    <div className="popup">
        <button className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)} >Close</button>
            {props.children}

        </button>
        
    </div>
    
  ) : "";
}

export default Popup