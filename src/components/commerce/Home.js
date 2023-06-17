import React, {useEffect, useState} from 'react'
import {Button} from "react-bootstrap";
import NaviBar from "./NaviBar";
import JumboComm from "./JumboComm";

function Home() {
    const [prod, setProd] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProd(data.data))
    }
    , [])



    return (
        <div>
            <NaviBar />
            <div className="d-flex justify-content-between" style={{margin: '10px'}}>
                <div className="container">
                    <JumboComm prod={prod} />
                </div>
        </div>
        </div>

    )

}


export default Home
