import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import JobCardCarousel from './JobCardCarousel'

export default function JobCard(props) {
    return (<div>
        <Card style={{ width: '15rem', minHeight: '25rem' }}>
            {/* <JobCardCarousel picture={props.picture} /> */}
            <img src={props.picture} style={{ maxWidth: '10rem', maxHeight: '12rem'}} />
            <Card.Body>
                <Card.Title>{props.jobName}</Card.Title>
                <Card.Text style={{ fontStyle: 'italic' }}>Listed {props.datePosted}</Card.Text>
                <Card.Text>{props.description}</Card.Text>
                <Button variant="primary">See More</Button>
            </Card.Body>
        </Card>
    </div>
    )
}
