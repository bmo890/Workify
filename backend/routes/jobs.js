const express = require('express');
const { addJob, getJobs, getJob, getJobOffers, searchJobs, addOffer } = require('../dbwrappers/jobs');
const { uploadToCloud } = require('../lib/cloudinary');
const { upload } = require('../middlewares/multipart');
const parseBody = require('../middlewares/parseMiddleware');
const router = express.Router();
const fs = require('fs');

router.post('/', upload('jobs').single('image'), parseBody('job'), async (req, res, next) => {
	try {
		const { job } = req.body;
		const { path } = req.file;
		const result = path ? await uploadToCloud(path) : null;
		const jobId = await addJob(job, result.secure_url);
		path && fs.unlinkSync(path);
		res.status(201);
		res.send({ jobId });
	} catch (err) {
		console.log(err);
		res.status(500);
		res.send(err);
	}
});

router.get('/all/:location', async (req, res, next) => {
	try {
		const { location } = req.params;
		if (!location) {
			res.status(400);
			res.send({ message: 'please specify a location param' });
		}
		const jobs = await getJobs(location);
		res.status(200);
		res.send({ jobs });
	} catch (err) {
		next(err);
	}
});

router.get('/search', async (req, res, next) => {
	try {
		const { query, location } = req.query;
		if (!query || !location) {
			res.status(400);
			query
				? res.send({ message: 'please specify a location' })
				: res.send({ message: 'please specify a search query' });
		}
		const jobs = await searchJobs(query, location);
		res.status(200);
		res.send({ jobs });
	} catch (err) {
		next(err);
	}
});

router.get('/:jobId', async (req, res, next) => {
	try {
		const { jobId } = req.params;
		if (!jobId) {
			res.status(400);
			res.send({ message: 'please specify a job id param' });
		}
		const job = await getJob(jobId);
		if (!job) {
			res.status(404);
			res.send({ message: 'job not found' });
		}
		const offers = await getJobOffers(jobId);
		job.offers = offers;
		res.status(200);
		res.send({ job });
	} catch (err) {
		next(err);
	}
});

router.post('/offers', async (req, res, next) => {
	try {
		const { offer } = req.body;
		if (!offer) {
			res.status(400);
			res.send({ message: 'missing offer object' });
		}
		await addOffer(offer.userId, offer.jobId, +offer.price);
		res.status(201);
		res.send();
	} catch (err) {
		next(err);
	}
});

module.exports = router;
