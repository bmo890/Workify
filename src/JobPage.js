import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { getUserById, getJob, postOffer, selectOffer } from './lib/api';
import { useAuth } from './Components/Auth';

export default function JobPage(props) {
	const [ jobInfo, setJobInfo ] = useState('');
	const [ posterInfo, setPosterInfo ] = useState('');
	const [ showModal, setShowModal ] = useState(false);
	const [ selectedOffer, setSelectedOffer ] = useState('');
	const [ price, setPrice ] = useState('');
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
		console.log(offer);
		await selectOffer(offer);
		setSelectedOffer(offerId);
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
			<h1>{jobInfo.title}</h1>
			<h3>Posted by: {posterInfo.firstName}</h3>
			<h3>{posterInfo.location}</h3>
			<h4>Added: {timeStamp}</h4>
			<h4>Category: {jobInfo.category}</h4>
			<div style={{ width: '50rem' }}>
				<img
					style={{ maxWidth: '20rem' }}
					src={
						jobInfo.picture ? (
							jobInfo.picture
						) : (
							'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
						)
					}
				/>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '1rem' }}>
					<div>{jobInfo.description}</div>
					{auth.user.id === jobInfo.userId && (
						<Button
							disabled={!auth.user}
							variant="primary"
							style={{ margin: '1rem 15rem 0 15rem' }}
							onClick={handleOffer}
						>
							Make An Offer
						</Button>
					)}
				</div>
			</div>
			<ListGroup defaultActiveKey={selectedOffer}>
				{jobInfo.offers.map((offer) => {
					if (offer.selected) {
						setSelectedOffer(offer.id);
					}
					return (
						<ListGroup.Item
							key={offer.id}
							action
							onClick={() => handleSelectOffer(offer.id)}
							disabled={auth.user.id !== jobInfo.userId}
						>{`${offer.firstName} ${offer.lastName} Offered for: ${offer.price}$`}</ListGroup.Item>
					);
				})}
			</ListGroup>
		</div>
	);
}
