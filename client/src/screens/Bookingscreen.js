import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos'
import 'aos/dist/aos.css';

AOS.init({
    duration: 1000
});

function Bookingscreen({match}) {
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [provider, setprovider] = useState()

    const[gst, setgst] = useState()
    const[totalprice, settotalprice] = useState()
    // const gst = 5/100*provider.price;
    // const totalPrice = provider.price+gst;
    useEffect(() => {
        async function fetchData() {
            if(!localStorage.getItem('currentUser')){
                window.location.reload='/login'
            }
            try {
                setloading(true);
                const data = (await axios.post("/api/providers/getproviderbyid", {providerid: match.params.providerid})).data;
                // console.log(data);
                setgst(data.price * 5/100);
                settotalprice(data.price + data.price*5/100);
                setprovider(data);
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
            }
        }
        fetchData()
    }, [match.params.providerid])

    async function bookGas(){
        const bookingDetails = {
            provider,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            lpgid: JSON.parse(localStorage.getItem('currentUser')).lpgid,
            totalprice
        }
        try {
            const result = await axios.post('/api/bookings/bookgas', bookingDetails)
        } catch (error) {
            
        }
    }

    function onToken(token){
        console.log(token)
    }

    
  return (
    <div className='m-5' data-aos='flip-left'>
        {loading ? (<h1><Loader/></h1>) : provider ? (<div>
            <div className='row justify-content-center mt-5 bs'>
                <div className='col-md-6'>
                    <h1>{provider.name}</h1>
                    <img src={provider.imageurls[0]} alt="" className='smallimg' />
                </div>
                <div className='col-md-6'>
                    <div>
                    <h1>Booking Details</h1>
                    <hr />
                    <b>
                    <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                    <p>LPG Id: {JSON.parse(localStorage.getItem('currentUser')).lpgid}</p>
                    <p>Mobile no: {JSON.parse(localStorage.getItem('currentUser')).mobile}</p>
                    </b>
                    </div>

                    <div>
                    <h1>Amount</h1>
                    <hr/>
                    <b>
                        <p>Price: {provider.price}</p>
                        <p>GST: {gst}</p>
                        <p>Total Amount: {totalprice}</p>
                    </b>
                    </div>
                    
                    <div style={{float: 'right'}}>
                        {/* <button className='btn btn-primary' onClick={bookGas}>Pay Now</button> */}

                        <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51Mb37qSFzLal2hklbcCnLKysaKF3hYqaHTNTGWNVgxSlCby9THIW9RfGcMwOvsWSYPeS025cPZ3zYfZ1MaB99yAp00yWbt4N3U"
      >
        <button className='btn btn-primary' onClick={bookGas}>Pay Now</button>
        </StripeCheckout>
                    </div>
                </div>
            </div>
        </div>) : (<Error/>)}
    </div>
  )
}

export default Bookingscreen

