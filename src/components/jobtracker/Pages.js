import React from "react";
import {Route, Routes} from "react-router-dom";
import Jumbo from "./Jumbo";
import Register from "./Register";
import Login from "./Login";
import HomePage from "./HomePage";


function Pages() {
    return (
        <div>

            <Routes>
                <Route path={"/*"} element={<HomePage/>}/>
                {localStorage.getItem("token") ? <Route path="/jobs" element={<Jumbo/> }/> : <Route path="/jobs" element={<Login/>}/> }
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>

        </div>
    )
}

export default Pages
