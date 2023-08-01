import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import FormBuilder from './FormBuilder';
import {addJob} from './api';

async function onSubmitForm(job) {
    try {
        await addJob(job);
        alert('Job added successfully');
    } catch (err) {
        console.error(err.message);
    }
    window.location.reload();
}

function JobForm({initialJobState, handleClose, handleChanges}) {
    const {title, company, location, description, requirements} = initialJobState;

    return (
        <Modal show={false} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><h3 style={{color: "black"}}>Add Job</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{color: "black"}}>
                    <FormBuilder controlId="formBasicEmail" label="Title" type="text" placeholder="Enter Title"
                                 name="title" value={title} handleChanges={handleChanges}/>
                    <FormBuilder controlId="formBasicCompany" label="Company" type="text" placeholder="Enter Company"
                                 name="company" value={company} handleChanges={handleChanges}/>
                    <FormBuilder controlId="formBasicLocation" label="Location" type="text" placeholder="Enter Location"
                                 name="location" value={location} handleChanges={handleChanges}/>
                    <FormBuilder controlId="formBasicDescription" label="Description" type="text"
                                 placeholder="Enter Description" name="description" value={description}
                                 handleChanges={handleChanges}/>
                    <FormBuilder controlId="formBasicRequirements" label="Requirements" type="text"
                                 placeholder="Enter Requirements" name="requirements" value={requirements}
                                 handleChanges={handleChanges}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onSubmitForm(initialJobState)}>
                    Save Changes
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default JobForm;