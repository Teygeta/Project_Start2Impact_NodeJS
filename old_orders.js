
//const products = Object.values(JSON.parse(JSON.stringify(results)))


router.get('/', (req, res) => {
  let query = 'SELECT DISTINCT id_order FROM orders' //fare tutti gli endpoint con le query
  if (req.query.id) {
    query = `SELECT * FROM orders WHERE id_order LIKE ${req.query.id}`
  }
  executeQuery(query, (error, results) => {
    if (error) throw (error.message)
    const orders = Object.values(JSON.parse(JSON.stringify(results)));
    if (orders.length < 1) {
      res
        .status(200)
        .json({ success: true, data: 'No orders in the table' })
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
      .json({ success: true, data: 'Order added correctly' })
  })
})

router.put('/:id/:number', (req, res) => {
  const { id, number } = req.params
  const { id_product, id_user } = req.body

  executeQuery(`
    SELECT number_order FROM orders
    WHERE number_order = ${number}
  `, (error, results) => {
    if (error) throw error

    const orders = Object.values(JSON.parse(JSON.stringify(results)));
    if (orders.length < 1) res
      .status(200)
      .json({ success: false, data: `Order dosen't exists` })
    else {
      executeQuery(`
      UPDATE orders SET 
      id_product = ${id_product},
      id_user = ${id_user}
      WHERE id_order = ${id} AND number_order = ${number};
      `, (error, results) => {
        if (error) throw error
        res
          .status(200)
          .json({
            success: true,
            state: `Order updated correctly`
          })
      })
    }
  })
})

router.delete('/:id/:number?', (req, res) => {
  const { id, number } = req.params
  let query = `DELETE FROM orders WHERE id_order = ${id}`
  if (number) {
    query += ` AND number_order = ${number}`
  }
  executeQuery(query, (error, results) => {
    if (error) throw error
    res.status(200).json({
      success: true,
      state: 'Order deleted correctly'
    })
  })
})
