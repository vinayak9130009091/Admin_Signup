import React from 'react';
import '../../Components/InputField/input.css'

function InputField() {
  return (
    <div className="inputbox-container col-12" >
      <div className='inputfield-container'>
        <input type='text' style={{ height:'4vh', width:'100%', border: "2px solid rgb(100, 149, 237)", borderRadius:'10px', }}/>
      </div>
      
    </div>
  )
}

export default InputField