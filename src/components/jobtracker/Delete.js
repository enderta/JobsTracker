import React from 'react';
import {Button} from "react-bootstrap";

const apiUrl = `https://jobsapi-topaz.vercel.app/api/${localStorage.getItem('user_id')}/jobs/`;
const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
};
const Delete = (props) => {
    const handleDelete = (id) => {
        fetch(apiUrl + id, { // fetch data from the api
            method: 'DELETE',
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert('Job deleted successfully');
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
                variant='outline-danger'
                data-cy='delete-button'
                onClick={() => handleDelete(props.id)}
            >
                Delete
            </Button>
        </div>
    );
}

export default Delete;