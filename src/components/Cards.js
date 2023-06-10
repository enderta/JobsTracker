import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function Cards(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/jobs')
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            });
    }, []);

    const handleCheck = (id, isApplied) => {
        const updatedJobs = data.map((job) => {
            if (job.id === id) {
                return {
                    ...job,
                    is_applied: !isApplied,
                };
            }
            return job;
        });

        fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_applied: !isApplied }),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(updatedJobs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="row">
                {data.map((job) => (
                    <div key={job.id} className="col-md-4 mb-3">
                        <Card
                            className={props.dark ? '' : ''}
                            style={{ backgroundColor: props.dark ? '#070f23' : 'white' }}
                        >
                            <Card.Body>
                                <Card.Title>{job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                                <Card.Text>{job.description}</Card.Text>
                                <h6
                                    className="card-subtitle mb-2 text-muted"
                                    onClick={() => handleCheck(job.id, job.is_applied)}
                                >
                                    {job.is_applied ? 'Applied: ✅' : 'Applied: ❌'}
                                </h6>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards