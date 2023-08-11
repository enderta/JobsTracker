import React from 'react';

const API_URL = 'https://jobapi-5ktz.onrender.com/api';
const headers = {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')};
const currentDate = new Date().toISOString().split(' ').slice(0, 4).join(' ');
const userId = localStorage.getItem('user_id');

const isApplied = (props) => {
    const data = props.job;
    const baseJobData = {
        title: data.title,
        company: data.company,
        location: data.location,
        description: data.description,
        requirements: data.requirements,
        posted_at: currentDate,
        is_applied: data.is_applied,
        user_id: userId,
    };

    const handleCheck = async (id, isApplied) => {
        const url = `${API_URL}/${userId}/${id}`;

        if (isApplied === false) {
            const updatedJobData = {...baseJobData, is_applied: true, updated_at: currentDate};
            const body = JSON.stringify(updatedJobData);

            try {
                const response = await fetch(url, {method: 'PUT', headers, body});
                const data = await response.json();

                if (data.status === 'success') {
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div>
            <p>
        <span
            cy-data="applied-at"
            onClick={() => handleCheck(data.id, data.is_applied)}
            style={{color: data.is_applied ? 'forestgreen' : 'goldenrod',}}
        >
            {props.job.is_applied
                ? `Applied At: ${new Date(data.updated_at).toISOString().split("T")[0]}`
                : 'If you applied, click here!'}
        </span>
            </p>

        </div>
    );
};

export default isApplied;