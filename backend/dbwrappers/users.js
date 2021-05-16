const SQL = require('@nearform/sql');
const { query } = require('../lib/db');
const bcrypt = require('bcrypt');

async function addUser(email, passwordHash, name, lastName, phone_number, location) {
    try {
        await query(SQL`INSERT INTO users (email, password, first_name, last_name, phone, location)
         VALUES (${email}, ${passwordHash}, ${name}, ${lastName}, ${phone_number}, ${location} )`)
    } catch (err) {
        console.error(err)
    }
}

exports.addUser = addUser


async function getUserByEmail(email) {
    const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`)
    console.log(rows)
    return rows[0]
}

exports.getUserByEmail = getUserByEmail

async function comapareEmailPassword(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await getUserByEmail(email)
        if (!user) {
            res.status(404).send({ message: 'user not found with tihs email' })
            return
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) next(err)
            if (result) {
                next()
            } else {
                res.status(401).send({ message: 'incorrect password' })
            }
        })
    } catch (err) {
        console.error(err)
    }
}

exports.comapareEmailPassword = comapareEmailPassword


