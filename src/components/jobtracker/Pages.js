import React from "react";
import {Route, Routes} from "react-router-dom";
import Jumbo from "./Jumbo";
import Register from "./Register";
import Login from "./Login";
import HomePage from "./HomePage";

function Pages() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <div>

            <Routes>

            <Route path={"/*"} element={<HomePage/>}/>
                <Route path="/jobs" element={isLoggedIn ? <Jumbo/> : <Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default Pages;