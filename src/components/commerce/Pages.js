import React from 'react'
import Register from "./Register";
import { Route, Routes} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Basket from "./Basket";



function Pages() {
    return (
        <div>

            <Routes> <Route path={"/*"} element={<Home/>}/>
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>

        </div>
    )
}

export default Pages
