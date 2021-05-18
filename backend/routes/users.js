const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, getUserByEmail, comapareEmailPassword, editProfileWithoutPassword, editProfile, changeEmail, changePassword, changeProfile } = require('../dbwrappers/users')
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
                res.status(400).send(err)
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
            delete user.password
            const token = `Bearer ${jwt.sign({ id: user.id }, "123456", {
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
    }
);

router.put('/password',
    comapareEmailPassword,
    async (req, res) => {
        try {
            const { id, newPassword } = req.body
            bcrypt.hash(newPassword, 10, async (err, hash) => {
                if (err) next(err)
                else {
                    const response = await changePassword(id, hash)
                    res.status(200).send({ message: response })
                }
            })
        } catch (err) {
            res.status(400).send(err)
        }

    })

router.put('/email', async (req, res) => {
    try {
        const { id, newEmail, oldEmail } = req.body
        const response = await changeEmail(id, newEmail, oldEmail)
        res.status(202).send({ message: response })
    } catch (err) {
        res.status(400).send(err)
    }

})

router.put('/', async (req, res) => {
    try {
        const { id, first_name, last_name, phone, location } = req.body
        const response = await changeProfile(id, first_name, last_name, phone, location)
        res.status(202).send({ message: response })
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router;
