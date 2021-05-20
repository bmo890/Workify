const SQL = require('@nearform/sql');
const { query } = require('../lib/db');
const { v4: uuidv4 } = require('uuid');

async function addJob(job, picture_url) {
	const jobId = uuidv4();
	await query(
		SQL`INSERT INTO jobs (id, user_id, title, description, category, picture_url)
		VALUES (${jobId},${job.userId}, ${job.title}, ${job.description}, ${job.category},${picture_url})`
	);
	return jobId;
}
exports.addJob = addJob;

async function getJobs(location) {
	const result = await query(
		SQL`SELECT jobs.id AS jobId, user_id AS userId, jobs.title, jobs.description, jobs.category, jobs.picture_url AS picture FROM jobs JOIN users ON jobs.user_id = users.id WHERE users.location=${location} ORDER BY jobs.created_date desc`
	);
	return result;
}
exports.getJobs = getJobs;

async function getJob(jobId) {
	const result = await query(
		SQL`SELECT user_id AS userId, title, description, category, picture_url AS picture, created_date AS createdDate FROM jobs WHERE id=${jobId}`
	);
	return result[0];
}
exports.getJob = getJob;

async function getJobOffers(jobId) {
	const result = await query(
		SQL`SELECT offers.*,users.first_name AS firstName, users.last_name AS lastName FROM offers JOIN users ON offers.user_id=users.id WHERE job_id=${jobId}`
	);
	return result;
}
exports.getJobOffers = getJobOffers;

async function searchJobs(searchQuery, location) {
	const sqlQuery = SQL``;
	sqlQuery.append(
		SQL`SELECT jobs.id AS jobId, jobs.title, jobs.description, jobs.category, jobs.picture_url AS picture FROM jobs JOIN users ON jobs.user_id=users.id WHERE users.location='${location}' AND (title LIKE '%${searchQuery}%' OR title LIKE '%${searchQuery}%' OR category LIKE '%${searchQuery}%') ORDER BY jobs.created_date DESC`,
		{ unsafe: true }
	);
	const result = await query(sqlQuery);
	return result;
}
exports.searchJobs = searchJobs;

async function addOffer(userId, jobId, price) {
	await query(
		SQL`INSERT INTO offers (user_id, job_id, price)
		VALUES (${userId}, ${jobId}, ${price})`
	);
}
exports.addOffer = addOffer;

async function getJobsByUserId(userId) {
	const result = await query(
		SQL`SELECT jobs.id AS jobId, user_id AS userId, jobs.title, jobs.description, jobs.category, jobs.picture_url AS picture FROM jobs JOIN users ON jobs.user_id = users.id WHERE users.id=${userId} ORDER BY jobs.created_date desc`
	);
	return result;
}
exports.getJobsByUserId = getJobsByUserId;

async function getMyOffers(userId) {
	const result = await query(
		SQL`SELECT jobs.id AS jobId, jobs.title, jobs.description, jobs.category, jobs.picture_url AS picture FROM offers JOIN jobs ON offers.job_id=jobs.id WHERE offers.user_id=${userId}`
	);
	return result;
}
exports.getMyOffers = getMyOffers;

async function selectOffer(jobId, offerId) {
	await query(SQL`UPDATE offers
	SET selected = false
	WHERE job_id=${jobId} AND selected=true`);
	await query(
		SQL`UPDATE offers
		SET selected = true
		WHERE id = ${offerId}`
	);
}
exports.selectOffer = selectOffer;
