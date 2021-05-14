import React from 'react' 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function JobCard(props) {
console.log(props.key)
    return (<div>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.picture} />
            <Card.Body>
                <Card.Title>{props.jobName}</Card.Title>
                <Card.Text style={{fontStyle: 'italic'}}>Listed {props.datePosted}</Card.Text>
                <Card.Text>{props.description}</Card.Text>
                <Button variant="primary">See More</Button>
            </Card.Body>
        </Card>
    </div>
    )
}
