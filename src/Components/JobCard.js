import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {
    Link
} from "react-router-dom"
import { useAuth } from '../Components/Auth'

export default function JobCard(props) {
    let auth = useAuth()
    return (<div>
        <Card style={{ width: '15rem', minHeight: '25rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ border: '1px solid green', display: 'flex', justifyContent: 'center', backgroundColor: '#484D5B' }}>

                <img src={props.picture} style={{ maxWidth: '10rem', maxHeight: '12rem' }} />
            </div>
            <Card.Body>
                <Card.Title>{props.jobName}</Card.Title>
                <Card.Text style={{ marginBottom:'.5rem', fontSize:'.8em' }}><b>Category: </b>{props.category}</Card.Text>
                <Card.Text style={{ fontStyle: 'italic', marginBottom:'.5rem' }}>Listed {props.datePosted}</Card.Text>
                <Card.Text>{props.description}</Card.Text>
                <Link hidden={!auth.user} to={`job/${props.id}`}>
                    <Button disabled={!auth.user} variant="primary">See More</Button>
                </Link>
            </Card.Body>
        </Card>
    </div>
    )
}
