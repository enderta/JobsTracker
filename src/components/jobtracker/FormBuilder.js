import React from 'react';
import {Form} from 'react-bootstrap';

function FormBuilder({controlId, label, type, placeholder, name, value, handleChanges}) {
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChanges}
            />
        </Form.Group>
    );
}

export default FormBuilder;