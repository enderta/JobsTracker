import React, {useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

import Delete from "./Delete";
import EditJob from "./EditJob";
import IsApplied from "./IsApplied";

function JobCard({job, dark}) {
    const [showEdit, setShowEdit] = useState(false);
    const handleEdit = () => setShowEdit(true);
    const handleEditClose = () => setShowEdit(false);

    return (
        <div className="col-md-4">
            <Card data-testid="cards-component"
                  className="card mb-4 shadow-sm"
                  style={{backgroundColor: dark ? '#070f23' : 'white'}}>
                <Card.Body style={{height: '200px', width: '400px'}}>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                    <Card.Text>{job.description}</Card.Text>
                    <Card.Text>{job.location}</Card.Text>
                    <Card.Text>{job.requirements}</Card.Text>
                    <Card.Text><IsApplied job={job}/></Card.Text>
                </Card.Body>
                <br/>
                <Card.Footer>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Delete id={job.id}/>
                        <Button variant="outline-warning" onClick={handleEdit}>Edit</Button>
                    </div>
                    <EditJob id={job.id} showEdit={showEdit} closeEdit={handleEditClose} job={job}/>
                </Card.Footer>
            </Card>
        </div>
    );
}

JobCard.propTypes = {
    job: PropTypes.object.isRequired,
    dark: PropTypes.bool
}

export default JobCard;