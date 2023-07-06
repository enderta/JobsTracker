import React from 'react';
import {Button} from "react-bootstrap";

const Delete = (props) => {
    const handleDelete = (id) => {
        const updatedJobs = props.data.filter((job) => job.id !== id);

        fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                props.setData(updatedJobs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Button
                data-testid="delete-button"
                variant={props.dark ? 'outline-danger' : 'outline-danger'}
                onClick={() => handleDelete(props.id)}
            >
                Delete
            </Button>
        </div>
    );
}

export default Delete;