import React, { useState, useEffect } from 'react';
import JobCard from './Components/JobCard';
import { getMyJobs } from './lib/api';
import { useAuth } from './Components/Auth';

export default function MyJobsPage(props) {
	const [ jobs, setJobs ] = useState([]);
	const auth = useAuth();
	useEffect(async () => {
		try {
			const { response } = await getMyJobs(auth.user.id);
			setJobs(response);
		} catch (err) {
			setJobs([]);
		}
	}, []);
	return (
		<div>
			<h1>Your Jobs</h1>
			{/* Job Card Display */}
			<div>
				<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className="container">
					{jobs.map((job) => {
						return (
							<div style={{ margin: '1rem' }} key={job.jobId}>
								<JobCard
									id={job.jobId}
									picture={
										job.picture ? (
											job.picture
										) : (
											'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
										)
									}
									jobName={job.title}
									description={job.description}
									datePosted={job.datePosted}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
