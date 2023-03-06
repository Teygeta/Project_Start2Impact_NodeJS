const express = require('express')
const app = express()
const executeQuery = require('./modules/database');

app.use(express.json())

app.get('/orders', (req, res) => {
    executeQuery('select * from pof_purchasing.orders', (error, results) => {
        if (error) throw error
        res.status(200).json({ success: true, data: results })
    })
})

app.listen(3000)
