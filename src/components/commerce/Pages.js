import React from 'react'
import Register from "./Register";
import {Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";



function Pages() {
    return (
        <div>

            <Routes> <Route path={"/home"} element={<Home/>}/>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>

        </div>
    )
}

export default Pages
