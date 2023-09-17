import React from 'react';
import {Button} from 'react-bootstrap';

const AddJobButton = ({darkMode, handleShow}) => (
    <div style={{position: "relative"}}>
        <Button
            variant={darkMode ? 'outline-warning' : 'outline-dark'}
            onClick={handleShow}
            data-testid={"addJobs"}
        >
            +
        </Button>
    </div>
);

export default AddJobButton;