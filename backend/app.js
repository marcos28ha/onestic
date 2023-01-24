const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('express').Router()
const cors = require('cors')
const {generateData} = require('./controllers/fileController')
const { unknownEndpoint, errorHandler} = require('./middlewares/errorMiddleware')
const path = require('path')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(__dirname, '/ui/build')));

router.post('/api', (req, res, next) => {

    const body = req.body
    if(!(body.customers && body.products && body.orders)){
        return res.status(400).send({ error: 'Faltan uno o más archivos'})
    } else if((body.customers.length === 0 || body.products.length === 0  || body.orders.length === 0 )){
        return res.status(400).send({ error: 'Uno o más archivos se encuentran vacios'})
    }
    
    try{
        const {customers, products, orders} = req.body
        const result = generateData(customers, products, orders)
        res.status(200).send(result)
    }catch(error){
        next(error)
    }
})

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/ui/build/index.html'));
  });

app.use(router)
app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app







