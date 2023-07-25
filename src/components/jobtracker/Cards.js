import React, {useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import Filters from './Filters';
import Delete from "./Delete";

const API_URL = 'http://localhost:5000/api';

function Cards(props) {
    const [data, setData] = useState(props.data || []);
    const [search, setSearch] = useState('');
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const headers = {'Content-Type': 'application/json', Authorization: token};

    function fetchJobs() {
        const url = `${API_URL}/jobs/${userId}?search=${search}`;

        fetch(url, {method: 'GET', headers})
            .then((res) => res.json())
            .then((data) => setData(data.status === 'success' ? data.data : []))
            .catch((err) => console.log(err));
    }

    useEffect(fetchJobs, [search]);

    function handleSearch(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleCheck(id, isApplied) {
        const updatedJobs = data.map((job) => job.id === id ? {
            ...job,
            is_applied: !isApplied,
            updated_at: new Date().toISOString()
        } : job);

        const url = `${API_URL}/jobs/${userId}/${id}`;
        const body = JSON.stringify({
            is_applied: !isApplied,
            updated_at: new Date().toISOString(),
        });

        fetch(url, {method: 'PATCH', headers, body})
            .then(() => setData(updatedJobs))
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Filters data={data} value={search} handleSearch={handleSearch}/>
            </div>

            <div className="row" data-testid="cards-component">
                {data && data.length > 0
                    ? data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                        .map((job) => <JobCard key={job.id} job={job} handleCheck={handleCheck} {...props} />)
                    : []}
            </div>
        </div>
    );
}

function JobCard({job, handleCheck, dark}) {
    function onMouseOver(e, title) {
        e.target.style.cursor = 'pointer';
        e.target.title = title;
    }

    function getText(text) {
        return text.split(' ').length > 3 ? `${text.split(' ').slice(0, 4).join(' ')} ...` : text;
    }

    return (
        <div className="col-md-3 mb-3">
            <Card data-testid="cards-component" style={{backgroundColor: dark ? '#070f23' : 'white'}}>
                <Card.Body style={{height: '200px', width: '400px'}}>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                    <Card.Text
                        onMouseOver={(e) => onMouseOver(e, job.description)}>{getText(job.description)}</Card.Text>
                    <Card.Text>{job.location}</Card.Text>
                    <Card.Text
                        onMouseOver={(e) => onMouseOver(e, job.requirements)}>{getText(job.requirements)}</Card.Text>
                    <Card.Text>
                        <h6
                            cy-data="applied-at"
                            onClick={() => handleCheck(job.id, job.is_applied)}
                            style={{color: job.is_applied ? 'forestgreen' : 'goldenrod',}}
                        >
                            {job.is_applied
                                ? `Applied At: ${new Date(job.updated_at).toString().split(' ').slice(0, 4).join(' ')}`
                                : 'Click to Apply'}
                        </h6>
                    </Card.Text>
                </Card.Body>
                <br/>
                <Card.Footer>
                    <Delete id={job.id}/>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Cards;