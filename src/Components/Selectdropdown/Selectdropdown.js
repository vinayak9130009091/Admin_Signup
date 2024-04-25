import React from 'react';
import '../Selectdropdown/selectdropdown.css'

function Selectdropdown() {
  return (
    <div className="selectinput-container col-12" >
      <div className='selectfield-container col-12'>
        <select type='text' style={{ height: '4vh', width: '100%', border: "2px solid rgb(100, 149, 237)", borderRadius: '10px', }}>
          <option value="30min">30 minutes</option>
          <option value="4hours">4 hours</option>
          <option value="8hours">8 hours</option>
        </select>
      </div>

    </div>
  )
}

export default Selectdropdown