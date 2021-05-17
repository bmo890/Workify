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


async function editProfile(id, newUsername, oldUsername, first_name, last_name, phone, location, hash) {
    const checkEmail = await query(SQL`SELECT * FROM users WHERE email = ${newUsername}`)
    //console.log(checkEmail)
    if (checkEmail.length > 0) {
        return "Username already exists"
    } else {
        await query(SQL`UPDATE users
        SET
        email = ${newUsername},
        first_name = ${first_name},
        last_name = ${last_name},
        phone = ${phone},
        location = ${location},
        password = ${hash}
        WHERE
        id = ${id}`)

        await query(SQL`UPDATE jobs
        SET
        user_id = ${newUsername}
        WHERE
        user_id= ${oldUsername}`)
        return "Profile edited succesfully"
    }
}

exports.editProfile = editProfile

async function editProfileWithoutPassword(id, newUsername, oldUsername, first_name, last_name, phone, location) {
    const checkEmail = await query(SQL`SELECT * FROM users WHERE email = ${newUsername}`)
    //console.log(checkEmail)
    if (checkEmail.length > 0) {
        return "Username already exists"
    } else {
        await query(SQL`UPDATE users
        SET
        email = ${newUsername},
        first_name = ${first_name},
        last_name = ${last_name},
        phone = ${phone},
        location = ${location}
        WHERE
        id = ${id}`)

        await query(SQL`UPDATE jobs
        SET
        user_id = ${newUsername}
        WHERE
        user_id = ${oldUsername}`)

        return "Profile edited succesfully without password"
    }
}

exports.editProfileWithoutPassword = editProfileWithoutPassword


