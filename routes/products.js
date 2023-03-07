const express = require('express')
const router = express.Router()
const executeQuery = require('../modules/database');

router.get('/', (req, res) => {

    executeQuery('SELECT * FROM pof_purchasing.products;', (error, results) => {
        if (error) throw error
        res
            .status(200)
            .json({ success: true, data: results })
    })
})


router.get('/:id', (req, res) => {
    const { id } = req.params
    executeQuery(`
    SELECT * FROM pof_purchasing.products 
    WHERE id_product LIKE ${id};
    `, (error, results) => {
        //transform to string > object > array for remove "query result object" tipe
        let products = Object.values(JSON.parse(JSON.stringify(results)));
        if (error) throw error

        if (products.length < 1) res
            .status(200)
            .json({ success: false, data: `Id dosen't exists` })
        else res
            .status(200)
            .json({ success: true, data: results })
    })
})

//capire se posso gestire gli errori oppure fare un loop per verificare che non ci sia gia il prodotto inserito
router.post('/', (req, res) => {
    const { product } = req.body
    executeQuery(`
    INSERT INTO pof_purchasing.products (name_product) 
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

//I use patch because I edit only the name_product column
router.patch('/:id', (req, res) => {
    const { id } = req.params
    const { product } = req.body
    executeQuery(`
    UPDATE pof_purchasing.products 
    SET name_product = "${product}" 
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
})

router.delete('/:id', (req, res) => {
    //I can delete products without first deleting them from the "orders" table 
    //because I used ON DELETE CASCADE when creating the tables
    const { id } = req.params
    executeQuery(`
    DELETE FROM pof_purchasing.products 
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
