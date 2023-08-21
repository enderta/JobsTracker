import {useCallback, useEffect, useState} from 'react';

const API_URL = 'http://16.171.23.17:5000/api/jobs/';

function useFetchJobs(search, limit) {
    const [data, setData] = useState([]);
    const [jobsArray, setJobsArray] = useState([]);

    const fetchJobs = useCallback(() => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        };
        const userId = localStorage.getItem('user_id');
        if (limit === 0) {
            const url = `${API_URL}${userId}?search=${search}`;
            fetch(url, {method: 'GET', headers})
                .then((res) => res.json())
                .then((data) => setData(data.status === 'success' ? data.data : []))
                .catch((err) => console.log(err));
        } else {
            const url = `${API_URL}${userId}?search=${search}&limit=${limit}`;
            fetch(url, {method: 'GET', headers})
                .then((res) => res.json())
                .then((data) => setData(data.status === 'success' ? data.data : []))
                .catch((err) => console.log(err));
        }


        console.log(limit);
    }, [search, limit]);
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        };
        const userId = localStorage.getItem('user_id');
        const url = `${API_URL}${userId}`;
        fetch(url, {method: 'GET', headers})
            .then((res) => res.json())
            .then((data) => setJobsArray(data.status === 'success' ? data.data : []))
            .catch((err) => console.log(err));
    }, [])


    useEffect(() => {
        fetchJobs();

    }, [fetchJobs]);


    return [data, jobsArray];
}

export default useFetchJobs;