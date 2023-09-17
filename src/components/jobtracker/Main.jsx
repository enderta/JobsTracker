import React from 'react';
import Stocks from "./Stocks";
import Pages from "./Pages";
import NewsTicker from "./NewsTicker";

const Main = () => {
    const isLoggedIn = localStorage.getItem("token");
    return (
        <div>
            <div style={{position: "sticky", top: 0, zIndex: 1000}}>
                <Stocks/>
            </div>

            <div style={{marginTop: "80px"}}>
                <Pages/>
            </div>
            <div style={{margin: "20px"}}>
                <NewsTicker/>
            </div>
        </div>
    );
};

export default Main;