import {useCallback, useEffect, useState} from 'react';

const API_URL = 'http://localhost:5000/api/jobs/';

function useFetchJobs(search, limit) {
    const [data, setData] = useState([]);

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
        fetchJobs();

    }, [fetchJobs]);


    return data;
}

export default useFetchJobs;