import React, {useEffect, useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Button, Container, Modal} from 'react-bootstrap';
import Cards from './Cards';
import AddJobs from './AddJobs';
import {motion} from 'framer-motion';
import LogOut from "./LogOut";

function Jumbo() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [jumboData, setJumboData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleJumboClick = (id) => {
        setIsOpen(true);
        const jumboData = jobs.find((job) => job.id === id);
        setJumboData(jumboData);
    };

    const handleJumboClose = () => setIsOpen(false);


    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('bg-dark', 'text-white');
        } else {
            document.body.classList.remove('bg-dark', 'text-white');
        }
    }, [darkMode]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/jobs/${localStorage.getItem('user_id')}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
            })
            .then((res) => res.json())
            .then((data) => {
                setJobs(data.data);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{margin: '10px'}}>
            <div className="d-flex justify-content-between" style={{margin: '10px'}}>
                <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} onClick={handleShow} data-testid={"addJobs"}>
                    +
                </Button>

                <Button variant={darkMode ? 'outline-warning' : 'outline-dark'} id={"darkMode"} onClick={handleDarkMode}>
                    {darkMode ? (
                        <span className={"darkModeOn"} style={{color: 'goldenrod'}}>&#x2600; </span>
                    ) : (
                        <span className={"darkModeOff"} style={{color: 'darkgray'}}>&#127769;</span>
                    )}
                </Button>
            </div>

            <AddJobs show={show} handleClose={handleClose}/>

            {loading ? (
                <h1 >Loading...</h1>
            ) : (
                <motion.div
                    className="jumbotron jumbotron-fluid"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '500px',
                        borderRadius: '0',
                    }}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <div
                        className="jumbotron-background"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage:
                                'url("https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg")',
                            backgroundSize: 'cover',
                            opacity: 0.4,
                            zIndex: -1,
                        }}
                    ></div>
                    <Container>
                        <h1 className="display-4 text-center">
                            {jobs.length === 1 ? 'Job' : 'Jobs'}
                        </h1>
                        <p className="lead"></p>
                        <Carousel
                            infiniteLoop
                            showThumbs={false}
                            showStatus={false}
                            showIndicators={false}
                            showArrows={false}
                            interval={3000}
                            centerMode={true}
                            centerSlidePercentage={100}
                            stopOnHover={true}
                            autoPlay={true}

                        >
                            {jobs.map((job) => (
                                <div key={job.id}>
                                    <h3>{job.title}</h3>
                                    <h4>{job.company}</h4>
                                    <Button

                                        variant={darkMode ? 'outline-warning' : 'outline-dark'}
                                            onClick={() => handleJumboClick(job.id)}>View</Button>
                                    <Modal show={isOpen} onHide={handleJumboClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                <h4 style={{color: 'goldenrod'}}>{jumboData.title}</h4>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <h4 style={{color: 'darkgreen'}}>Company:{' '} {jumboData.company}</h4>
                                            <h5 style={{color: 'darkgreen'}}>Location:{' '} {jumboData.location}</h5>
                                            <h5 style={{color: 'darkgreen'}}>Description:{' '}{jumboData.description}</h5>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleJumboClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            ))}

                        </Carousel>
                    </Container>
                </motion.div>
            )}

            <div style={{margin: '10px'}}>
                <Container>
                    <Cards data={jobs} setData={setJobs} dark={darkMode}/>
                </Container>
            </div>
            <br/>
            <LogOut/>
        </div>
    );
}

export default Jumbo;
