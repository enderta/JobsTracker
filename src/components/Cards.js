import React, { useEffect, useState } from 'react';
import { Button, Card, Form, FormSelect } from 'react-bootstrap';

function Cards(props) {
    const [data, setData] = useState([]);
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const handleJobTitle = (e) => {
        setJobTitle(e.target.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        fetchJobs();
    }, [city, jobTitle, search]);

    const fetchJobs = () => {
        let apiUrl = 'http://localhost:5000/api/jobs';

        if (city) {
            apiUrl += `?search=${encodeURIComponent(city)}`;
        } else if (jobTitle) {
            apiUrl += `?search=${encodeURIComponent(jobTitle)}`;
        } else if (search) {
            apiUrl += `?search=${encodeURIComponent(search)}`;
        }

        fetch(apiUrl)
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
        const updatedJobs = data.filter((job) => job.id !== id);

        fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'DELETE',
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
            <div style={{marginTop:"10px",marginBottom:"10px"}}>

                <div className="row">
                    <div className="col-md-3">

                        <Form>
                            {/* <input type="text" placeholder="Search" value={search} onChange={handleSearch} />*/}
                            <FormSelect onChange={handleCity} value={city} style={{margin:"5px"}}>
                                <option value="">Select City</option>
                                {Array.from(new Set(data.map((job) => job.location))).map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </FormSelect>
                            <FormSelect onChange={handleJobTitle} value={jobTitle} style={{margin:"5px"}}>
                                <option value="">Select Job Title</option>
                                {Array.from(new Set(data.map((job) => job.title))).map((title) => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </FormSelect>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="row">
                {data.map((job) => (
                    <div key={job.id} className="col-md-3 mb-3">
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
