import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function JobCardCarousel(props) {
    return (
            <Carousel fade >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={props.picture}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={props.picture}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={props.picture}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
    )
}
