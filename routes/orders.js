const express = require('express')
const router = express.Router()
const connection = require('../modules/database');

// GET ORDER OR SINGLE ORDER
router.get('/:id?', (req, res) => {
  const { id } = req.params

  let query = `SELECT id_order, date_order, name_user FROM orders
  INNER JOIN users ON orders.id_user = users.id_user`

  if (id) query = `SELECT name_product, quantity FROM products_orders 
  INNER JOIN products 
  ON products_orders.id_product = products.id_product
  WHERE id_order = ?`

  const values = [id]

  connection.query(query, values, (error, results) => {
    if (error) throw error
    if (results.length < 1) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found or is empty' })
    }

    res.status(200).json({
      success: true,
      data: results
    })

  })
})

// CREATE ORDER
router.post('/', (req, res) => {
  const { id_user } = req.body

  let query = `INSERT INTO orders (id_user) VALUES (?);`

  const values = [id_user]

  connection.query(query, values, (error, results) => {
    if (error) {
      switch (error.code) {
        case 'ER_DUP_ENTRY':
          return res
            .status(404)
            .json({ success: true, data: `Order with user id ${id_user} already exist` })
        case 'ER_NO_REFERENCED_ROW_2':
          return res
            .status(404)
            .json({ success: true, data: `User ${id_user} not found` })
        default:
          throw error
      }
    }
    res
      .status(200)
      .json({ success: true, state: "Order created correctly" })
  })
})

// INSERT PRODUCTS INTO ORDER
router.post('/:id_order/add_products', (req, res) => {
  const { id_order } = req.params
  const { id, quantity } = req.query

  let query = `
  INSERT INTO products_orders (id_order, id_product, quantity) 
  VALUES (${id_order}, ${id}, ${quantity ? quantity : 1}); 
`

  const values = [id_order, id, quantity ? quantity : 1]

  connection.query(query, values, (error, results) => {
    if (error) {

      switch (error.code) {
        case 'ER_DUP_ENTRY':
          return res
            .status(404)
            .json({ success: true, data: `Product with id ${id} already exist in this order` })
        case 'ER_NO_REFERENCED_ROW_2':
          return res
            .status(404)
            .json({ success: true, data: `Product ${id} not found` })
        case 'ER_BAD_FIELD_ERROR':
          return res
            .status(404)
            .json({ success: true, data: `Request not valid` })
        default:
          throw error
      }
    }
    res
      .status(200)
      .json({ success: true, state: `${quantity ? quantity : 1}x product with id ${id} added correctly into order ${id_order}` })
  })
})

// EDIT ORDER
router.put('/:id_order', (req, res) => {
  const { id_order } = req.params
  const { id_product, quantity } = req.body

  let query = `
  UPDATE products_orders SET quantity=${quantity} 
  WHERE id_order=${id_order} AND id_product=${id_product}
`

  connection.query(query, (error, results) => {
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: `Order or product not found`
      })
    }
    if (error) {
      if (error.code) {
        return res
          .status(404)
          .json({ success: false, data: `Order ${id_order} or product ${id_product} not found` })
      } throw error
    }

    res
      .status(200)
      .json({ success: true, state: `Product with id ${id_product} in order ${id_order} modified correctly` })
  })
})

// DELETE ORDER
router.delete('/:id', (req, res) => {
  const { id } = req.params
  let query = `DELETE FROM orders WHERE id_order = ?;`

  const values = [id]

  connection.query(query, values, (error, results) => {
    if (error) throw error
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: `Oreder not found`
      })
    }

    res.status(200).json({
      success: true,
      state: `Order ${id} deleted correctly`
    })
  })
})

// DELETE PRODUCT INSIDE ORDER
router.delete('/:id_order/delete_products', (req, res) => {
  const { id_order } = req.params
  const { id } = req.query

  let query = `DELETE FROM products_orders WHERE id_order = ? AND id_product = ?;`

  const values = [id_order, id]

  connection.query(query, values, (error, results) => {
    if (error) throw error
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: `Product or order not found`
      })
    }

    res.status(200).json({
      success: true,
      state: `Product ${id} deleted correctly from order ${id_order}`
    })
  })
})

module.exports = router
