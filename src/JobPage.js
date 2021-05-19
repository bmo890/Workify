import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { getUserById, getJob } from './lib/api'

export default function JobPage(props) {
    const [jobInfo, setJobInfo] = useState("")
    const [posterInfo, setPosterInfo] = useState("")

    let { jobId } = useParams()

    useEffect(async () => {
        const currentJob = await getJob(jobId)
        setJobInfo(currentJob.job)
        const jobPoster = await getUserById(currentJob.job.userId)
        setPosterInfo(jobPoster)
    }, [])


    console.log(jobInfo)
    console.log(posterInfo)

    let timeStamp = new Date(jobInfo.createdDate)
    timeStamp = timeStamp.toString().slice(4, 15)
    console.log(timeStamp)

    return (<div>
        <h1>{jobInfo.title}</h1>
        <h3>Posted by: {posterInfo.firstName}</h3>
        <h3>{posterInfo.location}</h3>
        <h4>Added: {timeStamp}</h4>
        <h4>Category: {jobInfo.category}</h4>
        <div style={{ width: '50rem' }}>
            <img style={{ maxWidth: '20rem' }} src={jobInfo.picture ? jobInfo.picture : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '1rem' }}>
                <div>{jobInfo.description}</div>
                <Button variant="primary" style={{ margin: '1rem 15rem 0 15rem' }}>Make An Offer</Button>
            </div>
        </div>
    </div>
    )
}