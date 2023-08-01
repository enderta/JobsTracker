import React, {useState} from 'react';
import JobForm from './JobForm';
import AddJobButton from "./AddJobButton";

function AddJobs(props) {
    const currentDate = new Date().toISOString().split(' ').slice(0, 4).join(' ');
    const user_id = localStorage.getItem('user_id');
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
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
            <AddJobButton handleOpen={handleOpenModal}/>

            {showModal && (
                <JobForm initialJobState={job} handleClose={handleCloseModal} handleChanges={handleChanges}/>
            )}
        </div>
    );
}

export default AddJobs;