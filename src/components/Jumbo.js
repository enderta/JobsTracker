import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Button, Container} from 'react-bootstrap';
import Cards from "./Cards";

function Jumbo() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

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
        fetch('http://localhost:5000/api/jobs')
            .then((res) => res.json())
            .then((data) => {
                setJobs(data.data);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ margin: '10px' }}>
            <div style={{ margin: '10px' }}>
            <Button variant={darkMode ? 'outline-warning':'outline-dark'} onClick={handleDarkMode}>
                {darkMode ? (
                    <span style={{ color: 'goldenrod' }}>&#x2600; </span>
                ) : (
                    <span style={{ color: 'darkgray' }}>&#127769;</span>
                )}
            </Button>

            </div>


            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div
                    className="jumbotron jumbotron-fluid"
                    style={{
                        position: 'relative',
                        width: '100%', // Adjust the width as desired
                        height: '500px', // Adjust the height as desired
                        borderRadius: '0', // Remove rounded corners for a square shape
                    }}
                >
                    <div
                        className="jumbotron-background"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg")',
                            backgroundSize: 'cover',
                            opacity: 0.2, // Adjust the opacity as desired
                            zIndex: -1,
                        }}
                    ></div>
                    <Container>
                        <h1 className="display-4">Jumbotron Heading</h1>
                        <p className="lead">Jumbotron Subtitle</p>
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
                                    <p>{job.location}</p>
                                    <p>{job.description}</p>
                                </div>
                            ))}
                        </Carousel>
                    </Container>

                </div>  )}

            <div style={{margin:"10px"}}>
                <Container>
                    <Cards data={jobs} setData={setJobs} dark={darkMode} />
                </Container>
            </div>
        </div>
    );
}

export default Jumbo;
