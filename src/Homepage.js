import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';


export default function Homepage(props) {
    const [advancedSearch, setAdvancedSearch] = useState(false)

    const [basicType, setBasicType] = useState("")

    const handleBasicType = (value) => {setBasicType(value)}

console.log(basicType)
    return (
        <div>
            <h1>Workify Homepage</h1>
            <div style={{ border: '1px solid black', display: 'flex', justifyContent: 'center' }} className="container">
                <div style={{ display: 'flex', justifyContent: 'center' }} className="container">
                    <input className="form-control" type="search" placeholder="Search by job type in your city" onChange={(event) => handleBasicType(event.target.value)}/>
                    <button disabled={advancedSearch} type="button" className="btn btn-primary">Search</button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className="container">
                <div hidden={!advancedSearch} style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} className="container">
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Type</div>
                        <input></input>
                    </div>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>Location</div>
                        <input></input>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="container">

                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Advanced Search"
                        onClick={() => setAdvancedSearch(!advancedSearch)}
                    />
                </div>
            </div>


        </div>
    )
}
