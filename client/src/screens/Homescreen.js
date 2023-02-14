import React, { useState, useEffect } from 'react';
import axios from "axios";
import Provider from '../components/Provider';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Homescreen() {
    const [providers, setproviders] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true)
                const data = (await axios.get('/api/providers/getallproviders')).data
                setproviders(data)
                setloading(false)
            } catch (error) {
                seterror(true)
                console.log(error)
                setloading(false)
            }
        }
        fetchData()
    }, [])


    return (
        <div className='container'>
            <div className='row mt-5'></div>
            <div className="row justify-content-center mt-5">
                {loading ? (<h1><Loader/></h1>) : providers.length>1 ? (providers.map(provider => {
                    return <div className="col-md-9 mt-2">
                        <Provider provider={provider} />
                    </div>;
                })
                ) : (
                    <Error/>
                )}
            </div>
        </div>

    )
}

export default Homescreen;