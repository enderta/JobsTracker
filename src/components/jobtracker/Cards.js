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
        if (!data || data.length === 0) return [];
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
                <h4 style={{marginRight: '10px'}}>Number of Jobs to Show</h4>
                <Form.Select
                    aria-label="Default select example"
                    style={{width: '100px'}} // adjust width as needed
                    value={limit}
                    onChange={e => setLimit(parseInt(e.target.value))}
                >

                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="0">All</option>
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