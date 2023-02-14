import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Tabs } from 'antd';
import Swal from 'sweetalert2';

import Loader from '../components/Loader';
import Error from '../components/Error';


const { TabPane } = Tabs;

// 
function Adminscreen() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = "/home"
        }
    })
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontsize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Providers" key="2">
                    <Providers />
                </TabPane>
                <TabPane tab="Add Providers" key="3">
                    <Addprovider />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>

        </div>
    )
}

export default Adminscreen;


export function Bookings() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()


    useEffect(() => {
        async function fetchdata() {
            try {
                const data = (await axios.get("/api/bookings/getallbookings")).data
                // console.log(data)
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(error)
            }
        }
        fetchdata();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Bookings</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>LPG Id</th>
                            <th>Provider</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.lpgid}</td>
                                <td>{booking.provider}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>


                {/* {bookings.length && (<h1>There are total {bookings.length} bookings.</h1>)} */}
            </div>
        </div>
    )
}



export function Providers() {
    const [providers, setproviders] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()


    useEffect(() => {
        async function fetchdata() {
            try {
                const data = (await axios.get("/api/providers/getallproviders")).data
                // console.log(data)
                setproviders(data)
                setloading(false)
            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(error)
            }
        }
        fetchdata();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h1>Providers</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>Provider Id</th>
                            <th>Provider</th>
                            <th>Price</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.length && (providers.map(provider => {
                            return <tr>
                                <td>{provider._id}</td>
                                <td>{provider.name}</td>
                                <td>{provider.price}</td>
                                <td>{provider.phonenumber}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export function Users() {
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(() => {
        async function fetchdata() {
            try {
                const data = (await axios.get("/api/users/getallusers")).data
                // console.log(data)
                setusers(data)
                setloading(false)
            } catch (error) {
                console.log(error);
                setloading(false)
                seterror(error)
            }
        }
        fetchdata();
    }, [])

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>

                <table className='table table-dark table-bordered'>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>LPG Id</th>
                            <th>Mobile</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.lpgid}</td>
                                <td>{user.mobile}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export function Addprovider(){
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    const [name, setname] = useState('')
    const [price, setprice] = useState()
    const [phonenumber, setphonenumber] = useState()
    const [description, setdescription] = useState()
    const [imageurl1, setimageurl1] = useState()
    const [imageurl2, setimageurl2] = useState()

    async function addProvider(){
        const newprovider = {
            name,
            price,
            phonenumber,
            description,
            imageurls:[imageurl1, imageurl2]
        }

        try {
            setloading(true);
            const result = (await axios.post('/api/providers/addprovider', newprovider)).data
            console.log(result)
            setloading(false);
            Swal.fire('Congrats', "New Provider is Added Successfully", 'success').then(result=>{
                window.location.href='/admin'
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('OOps', "Something went wrong", 'error')
        }
    }

    return(
        <div className='row'>
            {loading && <Loader/>}
            <div className='col-md-5'>                <input type="text" className='form-control' placeholder='Provider Name' value={name} onChange={(e)=>{setname(e.target.value)}}  />
                <input type="text" className='form-control' placeholder='Price' value={price} onChange={(e)=>{setprice(e.target.value)}} />
                <input type="text" className='form-control' placeholder='Phone Number' value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}} />
            </div>
            <div className='col-md-5'>
            <input type="text" className='form-control' placeholder='Description' value={description} onChange={(e)=>{setdescription(e.target.value)}} />
            <input type="text" className='form-control' placeholder='Image URL 1' value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}} />
            <input type="text" className='form-control' placeholder='Image URL 2' value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}} />

            <div className='text-right'>
                <button className='btn btn-primary mt-2' onClick={addProvider}>Add Room</button>
            </div>
            </div>
        </div>
    )
}