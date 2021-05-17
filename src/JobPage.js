import React from 'react'
import JobCardCarousel from './Components/JobCardCarousel'
import Button from 'react-bootstrap/Button';


export default function JobPage(props) {
    const poster = {
        userName: 'Frank Johnson',
        userAvatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
        location: 'Brooklyn, New York'
    }

    const job = {
        userDetails: poster,
        jobName: 'Help me fix my door!',
        datePosted: '3 days ago',
        image: [],
        jobCategory: ['Woodworking', 'Handyman'],
        jobDescription: 'I broke my door handle while chasing my dog around the apartment. Looks like the handle needs to be replaced entirely. Not sure if I need a completely new door or not.'

    }

    const mapTags = job.jobCategory.join(`, `)
    

    console.log(job.userDetails)
    return (<div>
        <h1>{job.jobName}</h1>
        <h3>Posted by: {poster.userName}</h3>
        <h3>{poster.location}</h3>
        <h4>Added {job.datePosted}</h4>
        <h4>Tags: {mapTags}</h4>
        <div style={{ width: '50rem' }}>
            <JobCardCarousel picture={job.image.length > 0 ? job.image : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} />
            <div style={{ display: 'flex',flexDirection: 'column',justifyContent: 'center', marginTop: '1rem' }}>
                <div>{job.jobDescription}</div>
                <Button variant="primary" style={{margin: '1rem 15rem 0 15rem'}}>Make An Offer</Button>
            </div>

        </div>
    </div>
    )
}