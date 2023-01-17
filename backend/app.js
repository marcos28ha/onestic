const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('express').Router()
const cors = require('cors')
const {generateData} = require('./controllers/fileController')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

router.post('/', (req, res) => {
    const {customers, products, orders} = req.body
    const result = generateData(customers, products, orders)
    res.send(result)
})

app.use(router)

module.exports = app







