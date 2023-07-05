import React, {useState} from 'react'
import {FormSelect} from "react-bootstrap";

function Filters(props) {
    const [jobs, setJobs] = useState([]);
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const handleCity = (e) => {
        setCity(e.target.value);
    }
    const handleJobTitle = (e) => {
        setJobTitle(e.target.value);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //search for jobs
        if (city) {
            fetch(`http://localhost:5000/api/jobs?search=${city}`)
                .then(res => res.json())
                .then(data => {
                    setJobs(data.data)
                })
        } else if (jobTitle) {
            fetch(`http://localhost:5000/api/jobs?search=${jobTitle}`)
                .then(res => res.json())
                .then(data => {
                    setJobs(data.data)
                })
        } else if (search) {
            fetch(`http://localhost:5000/api/jobs?search=${search}`)
                .then(res => res.json())
                .then(data => {
                    setJobs(data.data)
                })
        } else {
            fetch('http://localhost:5000/api/jobs')
                .then(res => res.json())
                .then(data => {
                    setJobs(data.data)
                })
        }
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" value={search} onChange={handleSearch}/>

            <FormSelect onChange={handleCity} data-testid={'city-select'}>
                {props.jobs.map(job => (<option key={job.id} value={job.location}>{job.location}</option>))}
            </FormSelect>
            <FormSelect onChange={handleJobTitle} data-testid="job-title-select">
                {props.jobs.map(job => (<option key={job.id} value={job.title}>{job.title}</option>))}
            </FormSelect>

        </form>


    </div>)
}

export default Filters
