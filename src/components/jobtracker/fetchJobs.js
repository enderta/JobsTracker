const fetchJobs = async (setJobs, setIsLoading) => {
    setIsLoading(true);

    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:5000/api/jobs/${userId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', Authorization: token},
    });

    const {data} = await response.json();

    setJobs(data);
    setIsLoading(false);
};

export default fetchJobs;