import React from 'react';
import {Button} from "react-bootstrap";

const Delete = (props) => {


    return (
        <div>
            <Button
                data-testid="delete-button"
                variant={ 'outline-danger'}
                onClick={() => props.handleDelete(props.id)}
            >
                Delete
            </Button>
        </div>
    );
}

export default Delete;