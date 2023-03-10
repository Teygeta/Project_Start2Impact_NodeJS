const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/:id?', (req, res) => {
  const { id } = req.params
  let query = 'SELECT * FROM orders'

  if (id) query = `SELECT id_product FROM products_orders WHERE id_order = ${id}`

  executeQuery(query, (error, results) => {
    if (error) {
      res
        .status(409)
        .json({ success: false, error: error.sqlMessage })
    }
    res
      .status(200)
      .json({ success: true, state: results })
  })
})

router.post('/', (req, res) => {
  const { id_user } = req.body

  executeQuery(`
    INSERT INTO orders (id_user) VALUES (${id_user});
  `, (error, results) => {
    if (error) {
      res
        .status(409)
        .json({ success: false, error: error.sqlMessage })
    }
    res
      .status(200)
      .json({ success: true, state: "Order created correctly" })
  })
})

//insert product into specific order 
// (example: localhost:3000/orders/3/add_products?id=1)
router.post('/:id_order/add_products', (req, res) => {
  const { id_order } = req.params
  const { id } = req.query //id product (trovare il modo di gestier piu' id inseriti nella query string)

  executeQuery(`
    INSERT INTO products_orders (id_order, id_product) 
    VALUES (${id_order}, ${id}); 
  `, (error, results) => {
    if (error) {
      res
        .status(409)
        .json({ success: false, error: error.sqlMessage })
    }
    res
      .status(200)
      .json({ success: true, state: `Product ${id} added correctly into order ${id_order}` })
  })
})

router.put('/', (req, res) => {
  executeQuery(`
  
  `)
})
router.delete('/', (req, res) => {
  executeQuery(`
  
  `)
})

module.exports = router
