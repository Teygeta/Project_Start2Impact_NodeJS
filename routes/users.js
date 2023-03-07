const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/', (req, res) => {
    executeQuery('SELECT * FROM pof_purchasing.users;', (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({ success: true, data: results })
    })
})


router.get('/:id', (req, res) => {
    const { id } = req.params
    executeQuery(`
    SELECT * FROM pof_purchasing.users 
    WHERE id_user LIKE ${id};
    `, (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({ success: true, data: results })
    })
})

//capire anche qui come gestire gli errori (chiedere anche a juri)
router.post('/', (req, res) => {
    const { name_user, surname_user, email_user } = req.body
    executeQuery(`
    INSERT INTO pof_purchasing.users (name_user, surname_user, email_user)
    VALUES ("${name_user}","${surname_user}","${email_user}");
    `, (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({ success: true, data: "User added correctly" })
    })
})


router.patch('/:id', (req, res) => {
    const { id } = req.params
    const { name_user, surname_user, email_user } = req.body
    executeQuery(`
    UPDATE pof_purchasing.users 
    SET 
        name_user  = "${name_user}", 
        surname_user  = "${surname_user}", 
        email_user  = "${email_user}"
    WHERE id_user = ${id};
    `, (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({
                success: true,
                state: `User updated correctly`
            })
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    executeQuery(`
    DELETE FROM pof_purchasing.users
    WHERE id_user = ${id};
    `, (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({
                success: true,
                state: `User deleted correctly`
            })
    })
})

module.exports = router
