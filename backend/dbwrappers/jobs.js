const SQL = require('@nearform/sql');
const { query } = require('../lib/db');

async function addJob(job, picture_url) {
	await query(
		SQL`INSERT INTO jobs (user_id, title, description, category, picture_url)
		VALUES (${job.userId}, ${job.title}, ${job.description}, ${job.category},${picture_url})`
	);
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
		SQL`SELECT user_id AS userId, title, description, category, picture_url AS picture FROM jobs WHERE id=${jobId}`
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
