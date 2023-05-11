const express = require('express')
const router = express.Router()
const connection = require('../modules/database');

// GET PRODUCTS OR SINGLE PRODUCT
router.get('/:id?', (req, res) => {
  const { id } = req.params

  let query = 'SELECT * FROM products;'
  if (id) query = `SELECT * FROM products WHERE id_product = ?;`

  const values = [id]

  connection.query(query, values, (error, results) => {
    if (error) throw error
    if (results.length < 1) {
      return res
        .status(404)
        .json({ success: false, data: `Product not found` })
    }
    else {
      res
        .status(200)
        .json({ success: true, data: results })
    }
  })
})

// CREATE PRODUCT
router.post('/', (req, res) => {
  const { product } = req.body

  let query = `INSERT INTO products (name_product) VALUES (?);`

  const values = [product]

  connection.query(query, values, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res
          .status(404)
          .json({ success: true, data: "Product already exist" })
      } throw error
    }

    res
      .status(200)
      .json({ success: true, state: `Product added correctly` })
  })
})

// EDIT PRODUCT
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { product } = req.body

  let query = `
  UPDATE products SET name_product = ? 
  WHERE id_product = ?;
  `

  const values = [id, product]

  connection.query(query, values, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res
          .status(404)
          .json({ success: false, data: `Product already exist` })
      } throw error
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, data: `Product not found` })
    }

    res.status(200).json({
      success: true,
      state: `Product updated correctly`
    })
  })
}
)


// DELETE PRODUCT
router.delete('/:id', (req, res) => {
  const { id } = req.params
  let query = `DELETE FROM products WHERE id_product = ?;`

  const values = [id]

  connection.query(query, values, (error, results) => {
    if (error) throw error
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: `Product not found`
      })
    }

    res.status(200).json({
      success: true,
      state: `Product deleted correctly`
    })
  })
})

module.exports = router
