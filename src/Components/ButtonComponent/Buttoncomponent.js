import React from 'react';
import '../ButtonComponent/buttoncomponent.css';

function Buttoncomponent() {
    return (
        <>
            <div className="button-container col-12">
                <div className='button-section col-12' >
                    <div className='button-btn col-12' style={{ display: 'flex', justifyContent: 'left' }}>
                        <button >Login</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Buttoncomponent