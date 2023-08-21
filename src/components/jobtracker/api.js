export async function addJob(job) {
    const BASE_URL = 'http://16.171.23.17:5000/api/jobs/createJob/';
    return await fetch(BASE_URL + job.user_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(job),
    });
}

