import React, {useCallback, useMemo, useState} from 'react';
import {Form} from 'react-bootstrap';

import Filters from './Filters';
import JobCard from './JobCard';
import useFetchJobs from './useFetchJobs';

function Cards(props) {
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(3);

    const jobsInfo = useFetchJobs(search, limit);
    const data = jobsInfo[0]
    const jobNumber = jobsInfo[1]

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }, []);

    const sortedJobs = useMemo(() => {
        if (!jobNumber || jobNumber.length === 0) return [];
        return [...data].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }, [data]);
    return (
        <div>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Filters data={data} value={search} handleSearch={handleSearch}/>
            </div>
            <div>
                <h4>Total Jobs: {jobNumber.length}</h4>
            </div>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <h4 style={{marginRight: '10px'}}>Show</h4>
                <Form.Select
                    aria-label="Default select example"
                    style={{width: '100px'}} // adjust width as needed
                    value={limit}
                    onChange={e => setLimit(parseInt(e.target.value))}
                >
                    {jobNumber.length < 3 ? <option value="0">All</option> : null}
                    {jobNumber.length === 3 ? (<option value="3">3</option>) : null}
                    {jobNumber.length >= 4 && jobNumber.length < 6 ? (<option value="0">All</option>) : null}
                    {jobNumber.length === 6 ? (<option value="6">6</option>) : null}
                    {jobNumber.length >= 7 && jobNumber.length < 9 ? (<option value="0">All</option>) : null}
                    {jobNumber.length === 9 ? (<option value="9">9</option>) : null}
                    {jobNumber.length >= 10 && jobNumber.length < 12 ? (<option value="0">All</option>) : null}
                    {jobNumber.length === 12 ? (<option value="12">12</option>) : null}
                    {jobNumber.length > 13 ? (<option value="0">All</option>) : null}
                </Form.Select>
            </div>

            <div className="row" data-testid="cards-component">
                {sortedJobs.map((job) => (
                    <JobCard key={job.id} job={job} dark={props.dark}/>
                ))}
            </div>


        </div>
    );
}


export default Cards;