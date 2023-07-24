import React from 'react'
import {Form} from "react-bootstrap";

function Filters(props) {

    return (<div>
        <div className="row">
            <div className="col-md-3">
                <Form>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search" value={props.value}
                                      onChange={props.handleSearch}/>
                    </Form.Group>
                </Form>
            </div>
        </div>


    </div>)
}

export default Filters
