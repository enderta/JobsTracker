import React, {useCallback, useMemo, useState} from 'react';
import {Form} from 'react-bootstrap';

import Filters from './Filters';
import JobCard from './JobCard';
import useFetchJobs from './useFetchJobs';

function Cards({dark}) {
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(3);
    const [data, jobNumber] = useFetchJobs(search, limit);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }, []);

    const sortedJobs = useMemo(() => {
        if (!jobNumber || jobNumber.length === 0) {
            return [];
        }
        return [...data].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }, [data]);

    const renderOptions = () => {
        const options = [];

        for (let i = 3; i <= jobNumber.length && i <= 12; i += 3) {
            options.push(<option value={i.toString()} key={i}>{i}</option>);
        }

        if (jobNumber.length > 12 || jobNumber.length % 3 !== 0) {
            options.push(<option value="0" key="all">All</option>);
        }

        return options;
    };

    return (
        <div>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Filters data={data} value={search} handleSearch={handleSearch}/>
            </div>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <h4>
                    {jobNumber.length === 0 ? 'No job click + button to add job'
                        : jobNumber.length === 1
                            ? '1 job' : `${jobNumber.length} jobs`}
                </h4>
            </div>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                {jobNumber.length > 3 ? (
                    <>
                        <h4 style={{marginRight: '10px'}}>Show</h4>
                        <Form.Select
                            aria-label="Default select example"
                            style={{width: '100px', margin: "10px"}} // adjust width as needed
                            value={limit}
                            onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                            {renderOptions()}
                        </Form.Select>

                        <div className="row" data-testid="cards-component">
                            {sortedJobs.map((job) => (
                                <JobCard key={job.id} job={job} dark={dark}/>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="row" data-testid="cards-component">
                        {data.map((job) => (
                            <JobCard key={job.id} job={job} dark={dark}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cards;