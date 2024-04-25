import React from "react";
import "../../../Pages/AllPages/Insights/card.css";

function Card(props) {
  return (
    <>
      
        
        <div className="cardView" style={{display:'flex',  flexDirection:'column', gap:'15px'}}>
          <h2 style={{ fontSize: '60px' }}>{props.number}</h2>
          <h6 style={{fontSize:'15px'}}>{props.task}</h6>

        </div>
       
      
    </>
  );
}

export default Card;