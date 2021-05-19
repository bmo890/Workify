const SQL = require('@nearform/sql');
const { query } = require('../lib/db');
const bcrypt = require('bcrypt');

async function addUser(email, passwordHash, name, lastName, phone_number, location) {
	await query(SQL`INSERT INTO users (email, password, first_name, last_name, phone, location)
         VALUES (${email}, ${passwordHash}, ${name}, ${lastName}, ${phone_number}, ${location} )`);
}

exports.addUser = addUser;

async function getUserByEmail(email) {
	const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
	return rows[0];
}

exports.getUserByEmail = getUserByEmail;

async function comapareEmailPassword(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await getUserByEmail(email);
		if (!user) {
			res.status(404).send({ message: 'user not found with tihs email' });
			return;
		}
		bcrypt.compare(password, user.password, function(err, result) {
			if (err) next(err);
			if (result) {
				next();
			} else {
				res.status(401);
				res.send({ message: 'incorrect password' });
			}
		});
	} catch (err) {
		res.status(500);
		res.send({ message: 'something went wrong... whoops' });
	}
}

exports.comapareEmailPassword = comapareEmailPassword;

async function changeEmail(id, newEmail) {
	const checkEmail = await query(SQL`SELECT * FROM users WHERE email = ${newEmail}`);
	if (checkEmail.length > 0) {
		return 'Username already exists';
	} else {
		await query(SQL`UPDATE users
        SET
        email = ${newEmail}
        WHERE
        id = ${id}`);
	}
	return 'email changed succesfully';
}
exports.changeEmail = changeEmail;

async function changePassword(id, newPassword) {
	await query(SQL`UPDATE users
        SET
        password = ${newPassword}
        WHERE
        id = ${id}`);

	return 'Password changed succesfully';
}

exports.changePassword = changePassword;

async function changeProfile(id, first_name, last_name, phone, location) {
	await query(SQL`UPDATE users
        SET
        first_name = ${first_name},
        last_name = ${last_name},
        phone = ${phone},
        location = ${location}
        WHERE
        id = ${id}`);

	return 'Profile edited succedfully';
}

exports.changeProfile = changeProfile;

async function getUserById(id) {
	const rows = await query(
		SQL`SELECT id,email,first_name AS firstName,last_name AS lastName, phone, location FROM users WHERE id=${id}`
	);
	return rows[0];
}

exports.getUserById = getUserById;
