import React from 'react';
import {Button} from 'react-bootstrap';

const AddJobButton = ({darkMode, handleShow}) => (
    <Button
        variant={darkMode ? 'outline-warning' : 'outline-dark'}
        onClick={handleShow}
        data-testid={"addJobs"}
    >
        +
    </Button>
);

export default AddJobButton;