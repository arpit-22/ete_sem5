import React from 'react';
import { useState} from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    // let [color, setColor] = useState("#ffffff");

    return (
        <div style={{marginTop:'150px'}}>
            <div className="sweet-loading text-center">
                <center>
                <RingLoader
                    color='#000'
                    loading={loading}
                    css=''
                    size={80}
                />
                </center>
            </div>
        </div>
    )
}

export default Loader