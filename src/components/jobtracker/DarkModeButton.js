import React from 'react';
import {Button} from 'react-bootstrap';

const DarkModeButton = ({darkMode, handleDarkMode}) => (

    <Button
        style={{position: "relative"}}
        variant={darkMode ? 'outline-warning' : 'outline-dark'}
        id={"darkMode"}
        onClick={handleDarkMode}
    >
        {darkMode
            ? <span className={"darkModeOn"} style={{color: 'goldenrod'}}>&#x2600; </span>
            : <span className={"darkModeOff"} style={{color: 'darkgray'}}>&#127769;</span>
        }
    </Button>

);

export default DarkModeButton;