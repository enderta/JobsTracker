import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function Cards(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = () => {
        fetch('http://localhost:5000/api/jobs')
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCheck = (id, isApplied) => {
        const updatedJobs = data.map((job) =>
            job.id === id ? { ...job, is_applied: !isApplied } : job
        );

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

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                const updatedJobs = data.filter((job) => job.id !== id);
                setData(updatedJobs);
            })
            .catch((err) => {
                console.log(err);
            });
        window.location.reload();
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
                                <br />
                                <Button
                                    variant={props.dark ? 'outline-danger' : 'outline-danger'}
                                    onClick={() => handleDelete(job.id)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;
