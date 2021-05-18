import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JobCard from './Components/JobCard'


export default function Homepage(props) {
    const jobsList = [
        { jobId: 1, title: 'Job 1', description: 'This is a description of job 1', datePosted: '1 day ago', image: [] },
        { jobId: 2, title: 'Job 2', description: 'This is a description of job 2', datePosted: '2 days ago', image: [] },
        { jobId: 3, title: 'Job 3', description: 'This is a description of job 3', datePosted: '3 days ago', image: [] },
    ]

    const [advancedSearch, setAdvancedSearch] = useState(false)
    const [basicType, setBasicType] = useState("")
    const handleBasicType = (value) => { setBasicType(value) }
    const [searchResults, setSearchResults] = useState(jobsList)

    return (
        <div>
            <h1>Workify Homepage</h1>
            {/* Search Bar */}
            <div style={{ display: 'flex', justifyContent: 'center' }} className="container">
                <div style={{ display: 'flex', justifyContent: 'center' }} className="container">
                    <input className="form-control" type="search" placeholder="Search by job type in your city" onChange={(event) => handleBasicType(event.target.value)} />
                    <button disabled={advancedSearch} type="button" className="btn btn-primary">Search</button>
                </div>
            </div>
            {/* Advanced Options */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="container">
                <div hidden={!advancedSearch} style={{ marginLeft: '1rem', border: '1px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} className="container">
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Advanced 1</div>
                        <input></input>
                    </div>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Advanced 2</div>
                        <input></input>
                    </div>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Advanced 3</div>
                        <input></input>
                    </div>
                    <button disabled={!advancedSearch} type="button" className="btn btn-primary">Search</button>
                </div>
                {/* Advanced Search Toggle */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="container">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Advanced Search"
                        onClick={() => setAdvancedSearch(!advancedSearch)}
                    />
                </div>
            </div>
            {/* Job Card Display */}
            <div>
                {!searchResults ? 'No results found. Try another search.'
                    :
                    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="container">
                        {searchResults.map((job) => {
                            return (
                                <div style={{margin: '1rem'}}>
                                    <JobCard
                                        key={job.jobId}
                                        picture={job.image.length > 0 ? job.image : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}
                                        jobName={job.title}
                                        description={job.description}
                                        datePosted={job.datePosted}
                                    />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>


        </div>
    )
}
