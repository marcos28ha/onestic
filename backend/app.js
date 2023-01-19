const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('express').Router()
const cors = require('cors')
const {generateData} = require('./controllers/fileController')
const {inputValidator, unknownEndpoint, errorHandler} = require('./middlewares/errorMiddleware')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(inputValidator)

router.post('/', (req, res, next) => {
    try{
        const {customers, products, orders} = req.body
        const result = generateData(customers, products, orders)
        res.status(200).send(result)
    }catch(error){
        console.log('Last tier catch')
        next(error)
    }
})

app.use(router)
app.use(errorHandler)

module.exports = app







