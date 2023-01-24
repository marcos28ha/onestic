const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  

const errorHandler = (error, request, response, next) => {
    if(error.name === 'TypeError'){
        return response.status(400).send({ error: 'Alguno de los archivos contiene información defectuosa o un formato incorrecto'})
    }
    

    next(error)
}

module.exports = { unknownEndpoint, errorHandler}