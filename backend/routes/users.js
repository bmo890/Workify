const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, getUserByEmail, comapareEmailPassword, editProfileWithoutPassword, editProfile } = require('../dbwrappers/users')
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

router.post('/edit', async (req, res) => {
    const { id, email, oldEmail, first_name, last_name, phone, location, password } = req.body
    try {
        if (!password) {
            const response = await editProfileWithoutPassword(id, email,oldEmail, first_name, last_name, phone, location)
            return res.status(202).send({ message: response })
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) next(err)
            else {
                const response = await editProfile(id, email,oldEmail, first_name, last_name, phone, location, hash)
                res.status(202).send({ message: response })
            }
        })
    } catch (err) {
        res.status(403).send(err)
    }

})


module.exports = router;
