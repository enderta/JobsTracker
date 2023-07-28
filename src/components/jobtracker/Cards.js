import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import Filters from './Filters';
import Delete from "./Delete";
import EditJob from "./EditJob";
import IsApplied from "./IsApplied";

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



    return (
        <div>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Filters data={data} value={search} handleSearch={handleSearch}/>
            </div>

            <div className="row" data-testid="cards-component">
                {data && data.length > 0
                    ? data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                        .map((job) => <JobCard key={job.id} job={job} {...props} />)
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

    /*  function getText(text) {
          return text.split(' ').length > 3 ? `${text.split(' ').slice(0, 4).join(' ')} ...` : text;
      }*/

    const [showEdit, setShowEdit] = useState(false);

    const handleEdit = () => setShowEdit(true);
    const handleEditClose = () => setShowEdit(false);
    return (
        <div className="col-md-3 mb-3">
            <Card data-testid="cards-component" style={{backgroundColor: dark ? '#070f23' : 'white'}}>
                <Card.Body style={{height: '200px', width: '400px'}}>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                    {/*  <Card.Text
                        onMouseOver={(e) => onMouseOver(e, job.description)}>{getText(job.description)}
                    </Card.Text>*/}
                    <Card.Text>{job.location}</Card.Text>
                    {/* <Card.Text
                        onMouseOver={(e) => onMouseOver(e, job.requirements)}>{getText(job.requirements)}
                    </Card.Text>*/}
                    <Card.Text>
                        <IsApplied job={job}/>
                    </Card.Text>
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

export default Cards;