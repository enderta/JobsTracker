import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import AddJobs from './AddJobs';
import Cards from './Cards';
import useDarkMode from './useDarkMode';
import JobCarousel from './JobCarousel';
import LogInRedirect from './LogInRedirect';
import DarkModeButton from './DarkModeButton';
import AddJobButton from './AddJobButton';
import JumbotronBackground from './JumbotronBackground';
import LogOut from "./LogOut";
import ScrollToTop from "./ScrollToTop";

const API_URL = 'http://localhost:5000/api/jobs/';
const userId = localStorage.getItem('user_id');

const Jumbo = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useDarkMode();
    const [show, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [jumboData, setJumboData] = useState({});

    useEffect(() => {
        const fetchJobs = async () => {
            const headers = {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')};
            const response = await fetch(`${API_URL}${userId}`, {
                method: 'GET',
                headers: headers,
            });

            const data = await response.json();
            setJobs(data.data);
            setLoading(false);
        }

        fetchJobs();
    }, []);

    const handleModalToggle = () => setShowModal(!show);

    const handleJumboClick = (id) => {
        setIsOpen(true);
        const selectedJumbo = jobs.find((job) => job.id === id);
        setJumboData(selectedJumbo);
    };

    const handleDarkMode = () => setDarkMode(!darkMode);

    return (
        <>
            <ScrollToTop/>
            {localStorage.getItem('token') ? (
                <div style={{margin: '10px'}}>
                    <div className="d-flex justify-content-between" style={{margin: '10px'}}>
                        <AddJobButton darkMode={darkMode} handleShow={handleModalToggle}/>
                        <DarkModeButton darkMode={darkMode} handleDarkMode={handleDarkMode}/>
                    </div>

                    <AddJobs show={show} handleClose={handleModalToggle}/>

                    {loading ? (<h1>Loading...</h1>) : (
                        <JumbotronBackground>
                            <JobCarousel
                                jobs={jobs}
                                darkMode={darkMode}
                                isOpen={isOpen}
                                openModal={handleJumboClick}
                                closeModal={() => setIsOpen(false)}
                                selectedJob={jumboData}
                            />
                        </JumbotronBackground>
                    )}


                    <div style={{margin: '10px'}}>
                        <Container>
                            <Cards data={jobs} setData={setJobs} dark={darkMode}/>
                        </Container>
                    </div>
                    <div>
                        <LogOut/>
                        <br/>
                    </div>


                </div>
            ) : (
                <LogInRedirect/>
            )}
        </>
    );
};


export default Jumbo;