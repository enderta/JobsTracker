import React from 'react'
import {Button} from "react-bootstrap";

function Home() {
    return (
        <div><Button onClick={() => {
            window.location = '/login';}
        }>Login</Button>
        </div>
    )

        }


export default Home
