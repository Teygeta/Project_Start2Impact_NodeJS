const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/', (req, res) => {
  executeQuery('SELECT * FROM products;', (error, results) => {
    if (error) throw error
    //transform to string > object > array for remove "query result object" type
    const products = Object.values(JSON.parse(JSON.stringify(results)));
    if (products.length < 1) {
      res
        .status(200)
        .json({ success: false, data: `No product in the table` })
    }
    else {
      res
        .status(200)
        .json({ success: true, data: results })
    }
  })
})


router.get('/:id', (req, res) => {
  const { id } = req.params
  executeQuery(`
    SELECT * FROM products 
    WHERE id_product LIKE ${id};
    `, (error, results) => {
    if (error) throw error

    const products = Object.values(JSON.parse(JSON.stringify(results)));
    if (products.length < 1) {
      res
        .status(200)
        .json({ success: false, data: `Product dosen't exists` })
    }
    else {
      res
        .status(200)
        .json({ success: true, data: results })
    }
  })
})

//TODO capire se posso gestire gli errori oppure fare un loop per verificare che non ci sia gia il prodotto inserito
router.post('/', (req, res) => {
  const { product } = req.body
  executeQuery(`
    INSERT INTO products (name_product) 
    VALUES ("${product}");
    `, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({
        success: true,
        state: `Product added correctly`
      })
  })
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  //I can delete products without first deleting them from the "orders" table 
  //because I used ON DELETE CASCADE when creating the tables
  const { id } = req.params
  executeQuery(`
    DELETE FROM products 
    WHERE id_product = ${id};
    `, (error, results) => {
    if (error) throw error
    res
      .status(200)
      .json({
        success: true,
        state: `Product deleted correctly`
      })
  })
})

module.exports = router
