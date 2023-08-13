import React, {useCallback, useMemo, useState} from 'react';
import {Form} from 'react-bootstrap';

import Filters from './Filters';
import JobCard from './JobCard';
import useFetchJobs from './useFetchJobs';

function Cards(props) {
    const [search, setSearch] = useState('');
    const [visibleJobs, setVisibleJobs] = useState(3);
    const [limit, setLimit] = useState(3);

    const data = useFetchJobs(search, limit);

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
                <h4>Number of jobs: {data.length}</h4>
            </div>
            <div>
                <h4>Number of jobs per page: </h4>
                <Form.Select
                    aria-label="Default select example"
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

            {/*  {visibleJobs < sortedJobs.length && (
                <Button variant={"outline-primary"} onClick={() => setVisibleJobs((prevValue) => prevValue + 3)}>
                    Show More
                </Button>
            )}*/}

        </div>
    );
}


export default Cards;