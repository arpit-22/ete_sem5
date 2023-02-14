import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import {Tag, Divider} from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <div className='bs'>
                        <h1>My Profile</h1>
                        <br />
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>LPG Id: {user.lpgid}</p>
                        <p>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</p>
                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <Mybookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen;


export function Mybookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    useEffect(() => {
        async function fetchdata() {
            try {
                setloading(true)
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
                console.log(data)
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        fetchdata();
    }, []);


    async function cancelBooking(bookingid, providerid) {
        try {
            setloading(true)
            const result = (await axios.post("/api/bookings/cancelbooking", { bookingid, providerid })).data
            console.log(result)
            setloading(false)
            Swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('OOps', 'Something went wrong', 'error')
        }
    }
    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1>{booking.provider}</h1>
                            <p><b>BookingId:</b> {booking._id}</p>
                            <p><b>LPG Id:</b> {booking.lpgid}</p>
                            <p><b>Price:</b> {booking.totalprice}</p>
                            <p><b>Status:</b> {" "}
                            {booking.status=='cancelled' ? (<Tag color="orange">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                            </p>

                            {booking.status !== 'cancelled' && (<div className='text-right'>
                                <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.providerid) }}>CANCEL BOOKING</button>
                            </div>)}

                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}