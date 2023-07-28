import React, {useState} from 'react';


const API_URL = 'http://localhost:5000/api';
const isApplied = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isApplied, setIsApplied] = useState(props.job.is_applied);
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const headers = {'Content-Type': 'application/json', Authorization: token};
    const data = props.job;
    const handleCheck = async (id, isApplied) => {
        console.log(data);
        let body;
        const url = `${API_URL}/jobs/${userId}/${id}`;
        if (!isApplied) {

            body = JSON.stringify(
                {
                    is_applied: !isApplied,
                    title: data.title,
                    company: data.company,
                    location: data.location,
                    description: data.description,
                    requirements: data.requirements,
                    updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                }
            );
        } else {
            body = JSON.stringify(
                {
                    is_applied: data.is_applied,
                    title: data.title,
                    company: data.company,
                    location: data.location,
                    description: data.description,
                    requirements: data.requirements,
                    updated_at: data.updated_at,
                }
            );
        }
        console.log(body);
        try {
            const response = await fetch(url, {method: 'PUT', headers, body});
            const data = await response.json();

            if (data.status === 'success') {
                setIsApplied(!isApplied);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h6
                cy-data="applied-at"
                onClick={() => handleCheck(data.id, data.is_applied)}
                style={{color: data.is_applied ? 'forestgreen' : 'goldenrod',}}
            >
                {props.job.is_applied
                    ? `Applied At: ${new Date(data.updated_at).toString().split(' ').slice(0, 4).join(' ')}`
                    : 'If you applied, click here!'}
            </h6>
        </div>
    );
};

export default isApplied;
