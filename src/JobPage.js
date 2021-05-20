import React, { useState, useEffect } from 'react';
import './JobPage.css'
import { useParams } from 'react-router-dom';
import { Button, Modal, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { getUserById, getJob, postOffer, selectOffer } from './lib/api';
import { useAuth } from './Components/Auth';

export default function JobPage(props) {
    const [jobInfo, setJobInfo] = useState('');
    const [posterInfo, setPosterInfo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [price, setPrice] = useState('');
    const [isOffered, setIsOffered] = useState(false);
    const auth = useAuth();
    let { jobId } = useParams();

    useEffect(async () => {
        const currentJob = await getJob(jobId);
        setJobInfo(currentJob.job);
        const jobPoster = await getUserById(currentJob.job.userId);
        setPosterInfo(jobPoster);
    }, []);
    let timeStamp = new Date(jobInfo.createdDate);
    timeStamp = timeStamp.toString().slice(4, 15);
    const handleOffer = async () => {
        setShowModal(true);
    };
    const handleSelectOffer = async (offerId) => {
        const offer = {
            offerId,
            jobId
        };
        await selectOffer(offer);
        window.location.reload();
    };
    const postAnOffer = async () => {
        if (price <= 0) {
            alert('please enter price!');
        }
        const offer = {
            userId: auth.user.id,
            jobId,
            price: price
        };
        try {
            await postOffer(offer);
            window.location.reload();
        } catch (err) {
            alert('server error try again later');
        }
    };
    if (!jobInfo) {
        return <div />;
    }
    return (
        <div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Make an offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Amount (to the nearest dollar)"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={postAnOffer}>
                        Make an offer
					</Button>
                </Modal.Footer>
            </Modal>


            {/* top info */}
            <div class="topInfo">
                <div class="infoBox">
                    <h1>{jobInfo.title}</h1>
                    <h3>Posted by: {posterInfo.firstName} {posterInfo.lastName}</h3>
                    <h3>{posterInfo.location}</h3>
                    <h4>Added: {timeStamp}</h4>
                    <h4>Category: {jobInfo.category}</h4>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '1.5rem'}}><b>Description: </b>{jobInfo.description}</div>
            </div>


            <div class="picAndOffers">
                {/* picture */}
                <div class='housingPic'>
                    <img
                        style={{ maxWidth: '30rem' }}
                        src={
                            jobInfo.picture ? (
                                jobInfo.picture
                            ) : (
                                    'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
                                )
                        }
                    />

                </div>


                {/* offers */}
                <div class='housingOffers'>
                    <div class="offers">

                        <h1>Offers</h1>
                        <div>
                            <ListGroup>
                                {jobInfo.offers.map((offer) => {
                                    if (offer.user_id === auth.user.id) {
                                        if (!isOffered) setIsOffered(true);
                                    }
                                    return (
                                        <ListGroup.Item style={{ marginBottom: '.5rem' }}
                                            key={offer.id}
                                            action
                                            active={offer.selected}
                                            onClick={() => handleSelectOffer(offer.id)}
                                            disabled={auth.user.id !== jobInfo.userId}
                                        >{`${offer.firstName} ${offer.lastName} Offered for: ${offer.price}$`}</ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '1rem' }}>

                {auth.user.id !== jobInfo.userId && (
                    <Button
                        disabled={!auth.user || isOffered}
                        variant="primary"
                        style={{ margin: '1rem 15rem 0 15rem' }}
                        onClick={handleOffer}
                    >
                        Make An Offer
                    </Button>
                )}
            </div>
        </div>
    );
}
