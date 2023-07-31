import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const JobCarousel = ({jobs, isOpen, openModal, closeModal}) => {
    const [currentJob, setCurrentJob] = useState();

    const handleClick = (job) => {
        openModal(job.id);
        setCurrentJob(job);
    }

    return (
        <div>
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
                            variant={'outline-danger'} style={{margin: "10px"}} onClick={() => handleClick(job)}>View
                        </Button>
                    </div>
                ))}
            </Carousel>
            {currentJob && (
                <Modal show={isOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 style={{color: 'goldenrod'}}>{currentJob.title}</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 style={{color: 'darkgreen'}}>Company:{' '}{currentJob.company}</h5>
                        <h5 style={{color: 'darkgreen'}}>Location:{' '}{currentJob.location}</h5>
                        <h5 style={{color: 'darkgreen'}}>Description:{' '}{currentJob.description}</h5>
                        <h5 style={{color: 'darkgreen'}}>Requirements:{' '}{currentJob.requirements}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default JobCarousel;