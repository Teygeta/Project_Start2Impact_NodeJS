const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/', (req, res) => {
    executeQuery('SELECT * FROM pof_purchasing.orders', (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({ success: true, data: results })
    })
})


router.get('/:id', (req, res) => {
    const { id } = req.params
    executeQuery(`SELECT * FROM pof_purchasing.orders WHERE id_order LIKE ${id}`, (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({ success: true, data: results })
    })
})

module.exports = router
