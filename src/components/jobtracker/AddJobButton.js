import React from 'react';
import {Button} from 'react-bootstrap';

const AddJobButton = ({darkMode, handleOpen}) => (
    <Button
        variant={darkMode ? 'outline-warning' : 'outline-dark'}
        onClick={handleOpen}
        data-testid={"addJobs"}
    >
        +
    </Button>
);

export default AddJobButton;