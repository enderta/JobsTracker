import React from 'react'
import {Form} from "react-bootstrap";

const FiltersForm = ({value, handleSearch}) => (
    <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Control
                type="text"
                placeholder="Search"
                value={value}
                onChange={handleSearch}
            />
        </Form.Group>
    </Form>
);

const Filters = ({value, handleSearch}) => (
    <div>
        <div className="row">
            <div className="col-md-3">
                <FiltersForm value={value} handleSearch={handleSearch}/>
            </div>
        </div>
    </div>
);

export default Filters