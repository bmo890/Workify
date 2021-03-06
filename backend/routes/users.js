const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	addUser,
	getUserByEmail,
	comapareEmailPassword,
	editProfileWithoutPassword,
	editProfile,
	changeEmail,
	changePassword,
	changeProfile,
	getUserById
} = require('../dbwrappers/users');
const router = express.Router();
//installed bcrypt

router.post('/', async (req, res) => {
	const { email, password, firstName, lastName, phone, location } = req.body;
	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			if (err) console.error(err);
			else {
				const user = await getUserByEmail(email);
				if (user) {
					res.status(403).send({ message: 'User already exists' });
				}
				await addUser(email, hash, firstName, lastName, phone, location);
				res.status(201).send();
			}
		} catch (err) {
			console.log(err);
			res.status(400).send(err);
		}
	});
});

router.post('/login', comapareEmailPassword, async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await getUserByEmail(email);
		delete user.password;
		const token = `Bearer ${jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1d'
		})}`;
		res.status(201);
		res.send({
			token,
			user
		});
	} catch (err) {
		res.setHeader('Access-Control-Allow-Headers: Authorization');
		res.status(500);
		next(err);
	}
});

router.put('/password', comapareEmailPassword, async (req, res) => {
	try {
		const { id, newPassword } = req.body;
		bcrypt.hash(newPassword, 10, async (err, hash) => {
			if (err) next(err);
			else {
				const response = await changePassword(id, hash);
				res.status(200).send({ message: response });
			}
		});
	} catch (err) {
		res.status(400).send(err);
	}
});

router.put('/email', async (req, res) => {
	try {
		const { id, newEmail } = req.body;
		const response = await changeEmail(id, newEmail);
		res.status(202).send({ message: response });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.put('/', async (req, res) => {
	try {
		const { id, first_name, last_name, phone, location } = req.body;
		const response = await changeProfile(id, first_name, last_name, phone, location);
		res.status(202).send({ message: response });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400);
			res.send({ message: 'missing id param' });
		}
		const response = await getUserById(id);
		if (!response) {
			res.status(400).send({ message: 'no user with this id' });
		}
		res.status(200).send(response);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
