const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

//select the list of orders or select a specific order
router.get('/:id?', (req, res) => {
  const { id } = req.params
  let query = 'SELECT * FROM orders'

  if (id) query = `SELECT id_product, quantity FROM products_orders WHERE id_order = ${id}`

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

//a specific users creating order
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

//insert product and quantity into specific order 
// (example: localhost:3000/orders/3/add_products?id=1)
router.post('/:id_order/add_products', (req, res) => {
  const { id_order } = req.params
  const { id, quantity } = req.query //id product (trovare il modo di gestier piu' id inseriti nella query string)

  executeQuery(`
    INSERT INTO products_orders (id_order, id_product, quantity) 
    VALUES (${id_order}, ${id}, ${quantity ? quantity : 1}); 
  `, (error, results) => {
    if (error) {
      res
        .status(409)
        .json({ success: false, error: error.sqlMessage })
    }
    res
      .status(200)
      .json({ success: true, state: `${quantity}x product ${id} added correctly into order ${id_order}` })
  })
})

router.put('/:id_order/:id_product', (req, res) => {
  const { id } = req.params
  const { product } = req.body
  //query for verify if product exist
  executeQuery(` 
    SELECT id_product FROM products 
    WHERE id_product LIKE ${id};
    `, (error, results) => {
    if (error) throw error

    const products = Object.values(JSON.parse(JSON.stringify(results)));
    if (products.length < 1) {
      res
        .status(200)
        .json({ success: false, data: `Product dosen't exists` })
    }
    else { //else (if product exist) query product to put
      executeQuery(`
    UPDATE products SET name_product = "${product}" 
    WHERE id_product = ${id};
    `, (error, results) => {
        if (error) throw error
        res
          .status(200)
          .json({
            success: true,
            state: `Product updated correctly`
          })
      })
    }
  })

})

module.exports = router
