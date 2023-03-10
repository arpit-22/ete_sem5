import React from 'react';
import {Link} from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css';

AOS.init({
    duration: 2000
});
function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
        <div className='col-md-12 text-center'>
            <h3 data-aos='zoom-in' style={{color: 'white', fontSize: '130px', fontWeight: 'bold'}}>Online Gas Booking</h3>
            <h1 data-aos='zoom-out' style={{color: 'white'}}>"Welcome LPG Customer"</h1>
            <Link to='/home'>
            <button className='btn landingbtn'>Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen