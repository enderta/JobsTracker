import React, {useEffect, useState} from 'react';
import {Button, Card, Form, FormSelect} from 'react-bootstrap';
import {motion} from 'framer-motion';
import Filters from './Filters';
import Delete from "./Delete";

function Cards(props) {
    const [data, setData] = useState([]);
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
        const updatedJobs = data.map((job) => job.id === id ? {
            ...job,
            is_applied: !isApplied,
            updated_at: new Date().toISOString()
        } : job);

        fetch(`http://localhost:5000/api/jobs/${id}`, {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                is_applied: !isApplied, updated_at: new Date().toISOString(),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(updatedJobs);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (<div>
            <motion.div
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                layout
                data-isOpen={isOpen}
                initial={{borderRadius: 50}}
                className="parent"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                  <Filters data={data}
                           city={city}
                            jobTitle={jobTitle}
                            search={search}
                           handleCity={handleCity}
                           handleJobTitle={handleJobTitle}
                           handleSearch={handleSearch}/>
                </div>

                <div className="row"  data-testid="cards-component">
                    {data
                        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                        .map((job) => (<div key={job.id} className="col-md-3 mb-3">
                                <Card
                                    className={props.dark ? '' : ''}
                                    style={{backgroundColor: props.dark ? '#070f23' : 'white'}}

                                >
                                    <Card.Body style={{height: '200px', width: '400px'}}>
                                        <Card.Title>
                                            {job.title}
                                        </Card.Title>
                                        <Card.Subtitle
                                            className="mb-2 text-muted"
                                        >
                                            {job.company}
                                        </Card.Subtitle>
                                        <Card.Text
                                        >
                                            {job.description}
                                        </Card.Text>
                                        <Card.Text
                                        >
                                            {job.location}
                                        </Card.Text>

                                        <Card.Text>
                                            <h6

                                                onClick={() => handleCheck(job.id, job.is_applied)}
                                                style={{

                                                    color: job.is_applied ? 'forestgreen' : 'goldenrod', // Add more responsive styles here
                                                }}
                                            >

                                                {job.is_applied ? "Applied At: " + new Date(job.updated_at)
                                                    .toString()
                                                    .split(' ')
                                                    .slice(0, 4)
                                                    .join(' ') : "Not Applied"}
                                            </h6>
                                        </Card.Text>
                                    </Card.Body>
                                    <br/>
                                    <Card.Footer>
                                     <Delete  id={job.id} />
                                    </Card.Footer>
                                </Card>
                            </div>))}
                </div>
            </motion.div>
        </div>);
}

export default Cards;
