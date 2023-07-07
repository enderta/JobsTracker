import React from 'react';
import {Button} from "react-bootstrap";

const Delete = (props) => {
    const handleDelete = (id) => {

        fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <div>
            <Button
                data-testid="delete-button"
                variant={ 'outline-danger'}
                onClick={() => handleDelete(props.id)}
            >
                Delete
            </Button>
        </div>
    );
}

export default Delete;