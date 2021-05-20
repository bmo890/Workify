import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {
    Link
} from "react-router-dom"
import { useAuth } from '../Components/Auth'

export default function JobCard(props) {
    let auth = useAuth()
    let timeStamp = new Date(props.createdDate);
    timeStamp = timeStamp.toString().slice(4, 15);
    return (<div>
        <Card style={{ width: '15rem', height: '25rem', display: 'flex', justifyContent: 'center',  borderRadius: '1rem'}}>
            <div style={{height: '11rem',display: 'flex', justifyContent: 'center', backgroundColor: '#484D5B', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                <img src={props.picture} style={{ maxWidth: '10rem'}} />
            </div>
            <Card.Body>
                <Card.Title>{props.jobName}</Card.Title>
                <Card.Text style={{ marginBottom:'.25rem', fontSize:'.8em' }}><b>Category: </b>{props.category}</Card.Text>
                <Card.Text style={{ fontStyle: 'italic', marginBottom:'1rem', fontSize:'.8em' }}>Listed {timeStamp}</Card.Text>
                <Card.Text>{props.description}</Card.Text>
                <Link hidden={!auth.user} to={`job/${props.id}`}>
                    <Button disabled={!auth.user} variant="primary">See More</Button>
                </Link>
            </Card.Body>
        </Card>
    </div>
    )
}
