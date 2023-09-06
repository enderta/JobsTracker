import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';


async function addJob(job) {
    return await fetch("https://jobsapi-topaz.vercel.app/api/" + job.user_id + "/jobs", {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')},
        body: JSON.stringify(job),
    });
}

const currentDate = new Date().toISOString().split(' ').slice(0, 4).join(' ');
const user_id = localStorage.getItem('user_id');

function AddJobs(props) {

    const initialJobState = {
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        is_applied: false,
        posted_at: currentDate,
        updated_at: currentDate,
        user_id,
    };

// Initialize state
    const [job, setJob] = useState(initialJobState);
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await addJob(job);
            /* alert('Job added successfully');
             //wait for click to close modal and refresh page
             props.handleClose();*/
            window.location.reload();
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChanges = (e) => setJob({...job, [e.target.name]: e.target.value});

    return (
        <div className="container">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3 style={{color: "black"}}>Add Job</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{color: "black"}}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name="title"
                                          data-testid="Enter Title"
                                          value={job.title}
                                          onChange={handleChanges}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="Enter Company" name="company"
                                          data-testid="Enter Company"
                                          value={job.company}
                                          onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location" name="location"
                                          value={job.location}
                                          data-testid="Enter Location"
                                          onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" name="description"
                                          value={job.description}
                                          data-testid="Enter Description"
                                          onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Requirements</Form.Label>
                            <Form.Control type="text" placeholder="Enter Requirements" name="requirements"
                                          value={job.requirements}
                                          data-testid="Enter Requirements"
                                          onChange={handleChanges}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <div>
                        <Button variant="primary" onClick={onSubmitForm}

                                data-testid={"submit-button"}>
                            Save Changes
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddJobs;