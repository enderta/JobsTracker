
import React, {useEffect, useState} from 'react';
import Jumbo from "./components/Jumbo";
import './App.css';

function App() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/jobs')
                    .then(res => res.json())
                    .then(data => {
                        setJobs(data.data)
                    })
    }, []);

    console.log(jobs)

  return (
    <>
   <Jumbo />


    </>
  );
}

export default App;
