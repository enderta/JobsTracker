import React from 'react';
import Stocks from "./Stocks";
import Pages from "./Pages";

const Main = () => {
    const isLoggedIn = localStorage.getItem("token");
    return (
        <div>
            <div style={{position: "sticky", top: 0, zIndex: 1000}}>
                {isLoggedIn && <Stocks/>}
            </div>

            <div style={{marginTop: "80px"}}>
                <Pages/>
            </div>
        </div>
    );
};

export default Main;