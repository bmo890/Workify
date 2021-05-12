const mysql = require('mysql');
const Postgrator = require('postgrator');

const postgrator = new Postgrator({
	migrationDirectory: path.resolve(__dirname, '../migrations'),
	driver: 'mysql',
	host: '127.0.0.1',
	port: 3306,
	database: 'workify',
	username: 'root',
	password: '260295',
	schemaTable: 'migrations'
});
exports.postgrator = postgrator;

const pool = mysql.createPool({
	host: '127.0.0.1',
	database: 'workify',
	port: 3306,
	user: 'root',
	password: '260295'
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
