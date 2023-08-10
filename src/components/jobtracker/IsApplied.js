import React, {useState} from 'react';

const API_URL = 'https://jobapi-5ktz.onrender.com/api';
const IsApplied = (props) => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const [isApplied, setIsApplied] = useState(props.job.is_applied);
    const headers = {'Content-Type': 'application/json', Authorization: token};
    const data = props.job;
    const currentDate = new Date().toISOString();

    const baseJobData = {
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,
        requirements: data.requirements,
        posted_at: currentDate,
        is_applied: isApplied,
        user_id: userId,
    };

    const handleCheck = async (id, isApplied) => {
        const url = `${API_URL}/jobs/${userId}/${id}`;
        const updatedJobData = {...baseJobData, is_applied: true, updated_at: currentDate};
        const body = JSON.stringify(updatedJobData);

        try {
            const response = await fetch(url, {method: 'PUT', headers, body});
            const data = await response.json();
            if (data.status === 'success') {
                setIsApplied(true)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h6
                cy-data="applied-at"
                onClick={() => handleCheck(data.id, isApplied)}
                style={{color: isApplied ? 'forestgreen' : 'goldenrod',}}
            >
                {isApplied
                    ? `Applied At: ${new Date(data.updated_at).toISOString().split("T")[0]}`
                    : 'If you applied, click here!'}
            </h6>
        </div>
    );
};

export default IsApplied;