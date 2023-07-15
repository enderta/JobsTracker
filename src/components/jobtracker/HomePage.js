import React from 'react';
import {Image} from "react-bootstrap";
import Login from "./Login";

function HomePage() {

    return (
        <>
            <div>
                <Image src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
                       style={{position:"absolute", opacity: '0.8', height: "100%", width: "100%"}}/>
            </div>
            <Login/>
        </>


    );
}

export default HomePage;