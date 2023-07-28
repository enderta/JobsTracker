import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const EditJob = (props) => {


    const [job, setJob] = useState({
        title: props.job.title,
        company: props.job.company,
        location: props.job.location,
        description: props.job.description,
        requirements: props.job.requirements,
        is_applied: props.job.is_applied,
        posted_at: props.job.posted_at,
        updated_at: new Date().toISOString().split(' ').slice(0, 4).join(' '),
        user_id: localStorage.getItem('user_id'),
    })
    const handleChange = (e) => {
        setJob({...job, [e.target.name]: e.target.value})
    }

    const handleEdit = (id) => {
        const apiUrl = `http://localhost:5000/api/jobs/${localStorage.getItem('user_id')}/${id}`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(job)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
    }


    return (
        <div>
            <div className="container">
                <Modal show={props.showEdit} onHide={props.closeEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 style={{color: "black"}}>Edit Job</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{color: "black"}}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" value={job.title} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" name="company" value={job.company} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" name="location" value={job.location} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" value={job.description}
                                              onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Requirements</Form.Label>
                                <Form.Control type="text" name="requirements" value={job.requirements}
                                              onChange={handleChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.closeEdit}>
                            Close
                        </Button>
                        <div>
                            <Button variant="primary" onClick={() => handleEdit(props.id)}
                                    data-testid={"submit-button"}>
                                Save Changes
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    );
};

export default EditJob;