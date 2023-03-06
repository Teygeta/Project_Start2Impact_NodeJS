const express = require('express')
const app = express()

const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')

app.use(express.json())

app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/orders', ordersRouter)

app.listen(3000)
