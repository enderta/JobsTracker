import React from 'react'
import {Form, FormSelect} from "react-bootstrap";

function Filters(props) {

    return (<div>
        <div className="row">
            <div className="col-md-3">
                <Form>
                    <FormSelect
                        data-testid="city-select"
                        onChange={props.handleCity} value={props.city} style={{margin: '5px'}}>
                        <option   value="">Select City</option>
                        {[...new Set(props.data.map((job) => job.location))].map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>))}
                    </FormSelect>
                    <FormSelect onChange={props.handleJobTitle} value={props.jobTitle} style={{margin: '5px'}}
                                 data-testid="job-title-select"
                    >
                        <option value="">Select Job Title</option>
                        {[...new Set(props.data.map((job) => job.title))].map((title) => (
                            <option key={title} value={title}>
                                {title}
                            </option>))}
                    </FormSelect>
                </Form>
            </div>
        </div>


    </div>)
}

export default Filters
