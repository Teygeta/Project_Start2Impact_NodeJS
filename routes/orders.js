const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/', (req, res) => {
  executeQuery('SELECT * FROM orders', (error, results) => {
    if (error) throw error

    const users = Object.values(JSON.parse(JSON.stringify(results)));
    if (users.length < 1) {
      res
        .status(200)
        .json({ success: true, data: "No orders in the table" })
    } else {
      res
        .status(200)
        .json({ success: true, data: results })
    }
  })
})


router.get('/:id', (req, res) => {
  const { id } = req.params
  executeQuery(`
    SELECT * FROM orders 
    WHERE id_order LIKE ${id}
        `, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({ success: true, data: results })
  })
})

router.post('/', (req, res) => {
  const { id_order, id_product, id_user } = req.body

  executeQuery(`
    INSERT INTO orders (id_order, id_product, id_user)
    VALUES (${id_order}, ${id_product}, ${id_user})
  `, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({ success: true, data: "Order added correctly" })
  })
})

router

module.exports = router
