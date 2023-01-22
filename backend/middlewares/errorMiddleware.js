const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const inputValidator = (request, response, next) => {
    const body = request.body
    if(request.method != 'POST'){
        return response.status(404).send({ error: 'Endpoint desconocido'})
    }
    else if(!(body.customers && body.products && body.orders)){
        return response.status(400).send({ error: 'Faltan uno o más archivos'})
    } else if((body.customers.length === 0 || body.products.length === 0  || body.orders.length === 0 )){
        return response.status(400).send({ error: 'Uno o más archivos se encuentran vacios'})
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    console.log('Handler')

    if(error.name === 'TypeError'){
        console.log("catched error")
        return response.status(400).send({ error: 'Alguno de los archivos contiene información defectuosa o un formato incorrecto'})
    }

    next(error)
}

module.exports = { unknownEndpoint, inputValidator, errorHandler}