import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function JumboComm(props) {

    console.log(props.prod)

    return (
        <div>
            <div className="container">

                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={4}
                    interval={1000}
                    isPlaying={true}
                    infinite={true}
                    autoPlay={true}

                    zoomScale={0.5}


                >


                    <Slider>
                        {props.prod.map((prod) => (
                            <Slide index={prod.id}>
                                <img src={prod.image} alt={prod.name} />
                                <p>
                                    {prod.name}
                                </p>
                                <p>
                                    {prod.description}
                                </p>
                                <p>
                                    {prod.price}
                                </p>

                            </Slide>

                        ))}


                    </Slider>


                </CarouselProvider>
            </div>



            </div>
    )
}

export default JumboComm
