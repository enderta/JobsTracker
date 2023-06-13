import React, {useState} from 'react'
import {Button, Form, Modal} from "react-bootstrap";

function AddJobs(props) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [is_applied, setIs_applied] = useState(false);
    const [posted_at, setPosted_at] = useState("");
    const [updated_at, setUpdated_at] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {title, company, location, description, requirements, is_applied, posted_at, updated_at};
            const response = await fetch("http://localhost:5000/api/jobs", {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleChanges = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else if (e.target.name === "company") {
            setCompany(e.target.value)
        } else if (e.target.name === "location") {
            setLocation(e.target.value)
        } else if (e.target.name === "description") {
            setDescription(e.target.value)
        } else if (e.target.name === "requirements") {
            setRequirements(e.target.value)
        } else if (e.target.name === "is_applied") {
            setIs_applied(e.target.value)
        } else if (e.target.name === "posted_at") {
            setPosted_at(e.target.value)
        } else if (e.target.name === "updated_at") {
            setUpdated_at(e.target.value)
        }
    }

    return (
        <div>
            <div className="container">

                <Modal show={props.show} onHide={props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 style={{color: "black"}}>Add Job</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmitForm}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" name="title"
                                              value={title}
                                              onChange={handleChanges}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="Enter Company" name="company"
                                              value={company}
                                              onChange={handleChanges}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter Location" name="location"
                                              value={location}
                                              onChange={handleChanges}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" name="description"
                                              value={description}
                                              onChange={handleChanges}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Requirements</Form.Label>
                                <Form.Control type="text" placeholder="Enter Requirements" name="requirements"
                                              value={requirements}
                                              onChange={handleChanges}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <div>
                            <Button variant="primary" onClick={onSubmitForm}>
                                Save Changes
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>)
}

export default AddJobs
