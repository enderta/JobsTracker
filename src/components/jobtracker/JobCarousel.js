// JobCarousel.js
import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const JobCarousel = ({jobs, isOpen, openModal, closeModal, selectedJob}) => (
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
                    variant={'outline-danger'} onClick={() => openModal(job.id)}>View</Button>
                <Modal show={isOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h4 style={{color: 'goldenrod'}}>{job.title}</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 style={{color: 'darkgreen'}}>Company:{' '} {job.company}</h5>
                        <h5 style={{color: 'darkgreen'}}>Location:{' '} {job.location}</h5>
                        <h5 style={{color: 'darkgreen'}}>Description:{' '}{job.description}</h5>
                        <h5 style={{color: 'darkgreen'}}>Requirements:{' '}{job.requirements}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        ))}
    </Carousel>
);

export default JobCarousel;