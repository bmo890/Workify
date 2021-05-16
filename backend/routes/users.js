const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, getUserByEmail, comapareEmailPassword } = require('../dbwrappers/users')
const router = express.Router();
//installed bcrypt 

router.post('/',
    async (req, res) => {
        const { email, password, name, lastName, phone, location } = req.body
        bcrypt.hash(password, 10, async (err, hash) => {
            try {
                if (err) console.error(err)
                else {
                    const user = await getUserByEmail(email)
                    if (user) {
                        res.status(403).send({ message: 'User already exists' })
                    }
                    await addUser(email, hash, name, lastName, phone, location)
                    res.status(200).send({ message: "User created succesfully", email: email, name: name, lastName: lastName })
                }
            } catch (err) {
                console.error(err)
            }
        })
    })

router.post(
    '/login',
    comapareEmailPassword,
    async (req, res, next) => {
        try {
            const { email } = req.body
            const user = await getUserByEmail(email);
            const token = `Bearer ${jwt.sign({ id: user.id }, "123456", {
                expiresIn: '1d'
            })}`;
            res.status(201);
            res.send({
                token
            });
        } catch (err) {
            res.setHeader('Access-Control-Allow-Headers: Authorization');
            res.status(500);
            next(err);
        }
    }
);


module.exports = router;
