import React, {useEffect, useState} from 'react'
import {Button} from "react-bootstrap";
import NaviBar from "./NaviBar";

function Home() {

    return (
        <>
           <div className={"container"}>
               <NaviBar/>
           </div>
            <div>
                <h1>Home</h1>
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
