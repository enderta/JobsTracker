import React, {useState} from 'react';
import JobForm from './JobForm';

function AddJobs(props) {
    const currentDate = new Date().toISOString().split(' ').slice(0, 4).join(' ');
    const user_id = localStorage.getItem('user_id');

    const initialJobState = {
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        is_applied: false,
        posted_at: currentDate,
        updated_at: currentDate,
        user_id,
    };

    const [job, setJob] = useState(initialJobState);
    const handleChanges = (e) => setJob({...job, [e.target.name]: e.target.value});

    return (
        <div className="container">
            <JobForm initialJobState={job} handleClose={props.handleClose} handleChanges={handleChanges}/>
        </div>
    );
}

export default AddJobs;