import React from 'react';
import {Button} from "react-bootstrap";

const MyComponent = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/home';
    }
    return (
        <div style={{margin:"10px"}}>
            <Button variant={'outline-info'} onClick={handleLogout} data-tesid={"logout"}>Logout</Button>
        </div>
    );
};

export default MyComponent;
