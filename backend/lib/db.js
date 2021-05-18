const path = require('path');
const mysql = require('mysql');
const Postgrator = require('postgrator');
//260295
const postgrator = new Postgrator({
	migrationDirectory: path.resolve(__dirname, '../migrations'),
	driver: 'mysql',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	schemaTable: 'migrations'
});
exports.postgrator = postgrator;

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: +process.env.DB_PORT,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
});
exports.pool = pool;

function query(sql) {
	return new Promise((resolve, reject) => {
		pool.query(sql, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
}
exports.query = query;
