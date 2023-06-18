import React, {useEffect, useState} from 'react';
import NaviBar from './NaviBar';
import JumboComm from './JumboComm';
import Products from "./Products";

function Home() {


    return (
        <div>

            <NaviBar/>


        <JumboComm/>
            <Products/>


        </div>

    );
}

export default Home;
