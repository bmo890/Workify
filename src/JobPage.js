import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
// import JobCardCarousel from './Components/JobCardCarousel'
import Button from 'react-bootstrap/Button';
import { getUserById, getJob } from './lib/api'

export default function JobPage(props) {
    const [jobInfo, setJobInfo] = useState("")
    const [posterInfo, setPosterInfo] = useState("")
    
    let { jobId } = useParams()
    
    const getJobInfo =  async (jobId) => {
        return await getJob(jobId)
    }
    
    useEffect(async () => {
        console.log('hi')
        const currentJob = await getJobInfo(jobId)  
        setJobInfo(currentJob.job)
        const jobPoster =  await getUserById(currentJob.job.userId)
        setPosterInfo(jobPoster)
    }, [])
    
    const poster = {
        userName: 'Frank Johnson',
        userAvatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
        location: 'Brooklyn, New York'
    }
    
    const job = {
        poster: poster,
        jobName: 'Help me fix my door!',
        datePosted: '3 days ago',
        image: [],
        jobCategory: ['Woodworking', 'Handyman'],
        jobDescription: 'I broke my door handle while chasing my dog around the apartment. Looks like the handle needs to be replaced entirely. Not sure if I need a completely new door or not.'
        
    }
    
    const mapTags = job.jobCategory.join(`, `)
    console.log(jobInfo)
    console.log(posterInfo)
    
    let timeStamp = new Date (jobInfo.createdDate)
    timeStamp = timeStamp.toString().slice(4, 15)
    console.log(timeStamp)
    
    return (<div>
        <h1>{jobInfo.title}</h1>
        <h3>Posted by: {posterInfo.firstName}</h3>
        <h3>{posterInfo.location}</h3>
        <h4>Added: {timeStamp}</h4>
        <h4>Category: {jobInfo.category}</h4>
        <div style={{ width: '50rem' }}>
            <img src={jobInfo.picture ? jobInfo.picture : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} />
            {/* <JobCardCarousel picture={jobInfo.picture.length > 0 ? jobInfo.picture : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} /> */}
            <div style={{ display: 'flex',flexDirection: 'column',justifyContent: 'center', marginTop: '1rem' }}>
                <div>{jobInfo.description}</div>
                <Button variant="primary" style={{margin: '1rem 15rem 0 15rem'}}>Make An Offer</Button>
            </div>
        </div>
    </div>
    )
}