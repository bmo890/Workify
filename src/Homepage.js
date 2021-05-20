import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import JobCard from './Components/JobCard'
import { getJobList, search } from './lib/api'
import { useAuth } from './Components/Auth'



export default function Homepage(props) {

    const [searchParams, setSearchParams] = useState("")

    const [searchResults, setSearchResults] = useState(false)
    const [localJobs, setLocalJobs] = useState(false)
    const [resultsLength, setResultsLength] = useState(false)
    const [noneFound, setNoneFound] = useState(false)
    const auth = useAuth()

    const handleSearchParams = (value) => {
        setSearchParams(value)
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault()
        setNoneFound(false)
        setLocalJobs(false)
        setSearchResults(false)
        setResultsLength(false)
        let location = auth.user ? auth.user.location : 'tel aviv'
        try {
            const jobList = await search(searchParams, location)
            console.log(jobList.jobs)
            setSearchResults(jobList.jobs)
            setResultsLength(jobList.jobs.length)
            if (jobList.jobs.length === 0) {
                setNoneFound(true)
            }

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(async () => {
        if (auth.user) {
            const localJobsList = await getJobList(auth.user.location)
            setLocalJobs(localJobsList.jobs)
        }
    }, [])

    return (
        <div>
            <h1>Workify Homepage</h1>
            {/* Search Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 10rem 0 10rem' }} className="container">
                <div style={{ display: 'flex', justifyContent: 'center' }} className="container">
                    <input className="form-control" type="search" placeholder="Search jobs near you" onChange={(event) => handleSearchParams(event.target.value)} />
                    <button disabled={searchParams.length === 0} type="button" className="btn btn-primary" onClick={(event) => handleSearchSubmit(event)}>Search</button>
                </div>
            </div>
            {/* Job Card Display */}
            <div hidden={!resultsLength} style={{fontSize: '2rem', margin: '2rem 0 .5rem 8rem'}}>
                {resultsLength} job found near you!
            </div>
            <div hidden={!noneFound}>
                No Jobs Found. Try A Different Search
            </div>
            <div>
                {searchResults &&
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className="container">
                        {searchResults.map((job) => {
                            return (
                                <div style={{ margin: '1rem' }}>
                                    <JobCard
                                        key={job.jobId}
                                        picture={job.picture ? job.picture : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}
                                        jobName={job.title}
                                        description={job.description}
                                        category={job.category}
                                        createdDate={job.createdDate}
                                    />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <div>
                {localJobs &&
                    <div hidden={localJobs.length < 1}>
                        <div  style={{fontSize: '2rem', margin: '2rem 0 .5rem 8rem'}}> All Jobs In {auth.user.location}</div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', fontSize: '1rem' }} className="container">
                            {localJobs.map((job) => {
                                return (
                                    <div style={{ margin: '1rem' }}>
                                        <JobCard
                                            key={job.jobId}
                                            id={job.jobId}
                                            picture={job.picture ? job.picture : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}
                                            jobName={job.title}
                                            description={job.description}
                                            category={job.category}
                                            createdDate={job.createdDate}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>


        </div>
    )
}
