import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Modal} from "react-bootstrap";

const baseUrl = 'https://jobapi-5ktz.onrender.com/api/jobs';
const EditJob = ({job, showEdit, closeEdit, id}) => {

    const [jobState, setJobState] = useState({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        requirements: job.requirements,
        is_applied: job.is_applied,
        posted_at: job.posted_at,
        updated_at: new Date().toISOString().split(' ').slice(0, 4).join(' '),
        user_id: localStorage.getItem('user_id'),
    })
    const handleChange = (e) => {
        setJobState({...jobState, [e.target.name]: e.target.value})
    }

    const handleEdit = () => {
        const apiUrl = `${baseUrl}/${localStorage.getItem('user_id')}/${id}`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(jobState)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
    }

    return (
        <div className="container">
            <Modal show={showEdit} onHide={closeEdit}>
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
                    <Button variant="secondary" onClick={closeEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit} data-testid={"submit-button"}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
EditJob.propTypes = {
    job: PropTypes.shape({
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        requirements: PropTypes.string.isRequired,
        is_applied: PropTypes.bool.isRequired,
        posted_at: PropTypes.string.isRequired
    }).isRequired,
    showEdit: PropTypes.bool.isRequired,
    closeEdit: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};

export default EditJob;