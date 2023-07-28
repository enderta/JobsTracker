import React from 'react';


const API_URL = 'http://localhost:5000/api';
const isApplied = (props) => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const headers = {'Content-Type': 'application/json', Authorization: token};
    const data = props.job;

    const handleCheck = async (id, isApplied) => {
        let body;
        const url = `${API_URL}/jobs/${userId}/${id}`;
        if (isApplied === false) {

            body = JSON.stringify(
                {
                    is_applied: true,
                    title: data.title,
                    company: data.company,
                    location: data.location,
                    description: data.description,
                    requirements: data.requirements,
                    posted_at: data.posted_at,
                    updated_at: new Date().toLocaleString().split(' ').slice(0, 4).join(' '),
                })
            try {
                const response = await fetch(url, {method: 'PUT', headers, body});
                const data = await response.json();

                if (data.status === 'success') {

                    // eslint-disable-next-line no-unused-expressions
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div>
            <h6
                cy-data="applied-at"
                onClick={() => handleCheck(data.id, data.is_applied)}
                style={{color: data.is_applied ? 'forestgreen' : 'goldenrod',}}
            >
                {props.job.is_applied
                    ? `Applied At: ${new Date(data.updated_at).toLocaleString().split(' ').slice(0, 4).join(' ')}`
                    : 'If you applied, click here!'}
            </h6>
        </div>
    );
};

export default isApplied;
