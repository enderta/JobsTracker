import React from 'react';
import {Image} from 'react-bootstrap';

const LogInRedirect = () => (
    <h1 style={{color: 'goldenrod'}}>
        <div>
            <Image
                src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
                style={{position: "absolute", opacity: '0.5', height: "100%", width: "100%"}}
            />
            <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <h1 style={{color: 'goldenrod'}}>Welcome to Job Tracker App </h1>
                <h1 style={{color: 'goldenrod'}}>Please</h1>
                <a href={'/login'} style={{textDecoration: "none"}}>
                    <h1 style={{color: 'darkred'}}>Login</h1>
                </a>
                <h1 style={{color: 'goldenrod'}}>or</h1>
                <h1 style={{color: 'goldenrod'}}>
                    <a href={'/register'} style={{textDecoration: "none"}}>
                        <h1 style={{color: 'darkgreen'}}>Register</h1>
                    </a>
                </h1>
            </div>
        </div>
    </h1>
);

export default LogInRedirect;