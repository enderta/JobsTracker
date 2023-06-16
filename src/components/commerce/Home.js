import React, {useEffect, useState} from 'react'
import {Button} from "react-bootstrap";
import NaviBar from "./NaviBar";

function Home() {
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        if (darkMode) {

            document.body.style.backgroundColor = 'black';
            document.body.style.color = '#3a2f2f';
        } else {

            document.body.style.backgroundColor = '#e7e7e7';
            document.body.style.color = 'darkgray';
        }
    }, [darkMode]);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);

    };
    return (
        <>
            <div>
                <NaviBar darkMode={darkMode} handleDarkMode={handleDarkMode}/>
            </div>
            <div>
                <div style={{margin: '10px'}}>
                    <div className="d-flex justify-content-between" style={{margin: '10px'}}>
                        <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} onClick={handleDarkMode}>
                            {darkMode ? <span style={{color: 'goldenrod'}}>&#x2600; </span> :
                                <span style={{color: 'darkgray'}}>&#127769;</span>}
                        </Button>
                    </div>
                </div>
            </div>
            <div><Button onClick={() => {
                window.location = '/login';
            }
            }>Login</Button>
            </div>
        </>

    )

}


export default Home
