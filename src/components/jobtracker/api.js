export async function addJob(job) {
    const user_id = job.user_id;
    const BASE_URL = `https://jobsapi-topaz.vercel.app/api/${user_id}/jobs/createJob`;
    return await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(job),
    });
}

