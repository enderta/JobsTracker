import React, {useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import Filters from './Filters';
import Delete from "./Delete";

function Cards(props) {
    const [data, setData] = useState(props.data || []);
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
        let apiUrl = `http://localhost:5000/api/jobs/${localStorage.getItem('user_id')}`;
        if (city) {
            apiUrl += `?city=${city}`;
        }
        if (jobTitle) {
            apiUrl += `?title=${jobTitle}`;
        }
        if (search) {
            apiUrl += `?search=${search}`;
        }

        fetch(apiUrl,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
        })
            .then((res) => res.json())
            .then((data) => {
                data.status==='success' ? setData(data.data) : setData([]);
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

        fetch(`http://localhost:5000/api/jobs/${localStorage.getItem('user_id')}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token')
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
                    {data && data.length > 0
                        ? data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                            .map((job) => (<div key={job.id} className="col-md-3 mb-3">
                                <Card
                                    data-testid="cards-component"
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
                                        <Card.Text //read all the on mouse hover in spreate box
                                            onMouseOver={(e) => {
                                                e.target.style.cursor = 'pointer';
                                                e.target.title = job.description;
                                            }}
                                        >
                                            {job.description.length > 10 ? job.description.slice(0, 20) + '...' : job.description}
                                        </Card.Text>


                                        <Card.Text>
                                            <h6
                                                cy-data="applied-at"
                                                onClick={() => handleCheck(job.id, job.is_applied)}
                                                style={{

                                                    color: job.is_applied ? 'forestgreen' : 'goldenrod',
                                                }}
                                            >

                                                {job.is_applied ? "Applied At: " + new Date(job.updated_at)
                                                    .toString()
                                                    .split(' ')
                                                    .slice(0, 4)
                                                    .join(' ') : "Click to Apply"}
                                            </h6>
                                        </Card.Text>
                                    </Card.Body>
                                    <br/>
                                    <Card.Footer>
                                     <Delete  id={job.id} />
                                    </Card.Footer>
                                </Card>

                            </div>)):[]}
                </div>

        </div>);
}

export default Cards;
