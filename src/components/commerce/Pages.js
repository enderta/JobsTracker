import React from 'react'
import Register from "./Register";
import {Router, Route, Routes} from "react-router-dom";


function Pages() {
    return (
        <div>
    <Routes>
                <Route path="/register" element={<Register/>} />
    </Routes>

        </div>
    )
}

export default Pages
