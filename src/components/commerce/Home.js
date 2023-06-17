import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import NaviBar from './NaviBar';
import JumboComm from './JumboComm';

function Home() {
    const [prod, setProd] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((res) => res.json())
            .then((data) => setProd(data.data));
    }, []);

    return (
        <div >
            <div style={{margin:"10px"}}>
                <NaviBar />
            </div>

            <div style={{margin:"10px"}}>
                <JumboComm  />
            </div>

        </div>
    );
}

export default Home;
