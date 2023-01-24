const supertest = require('supertest')
const app = require('../app')
const {totalCost, customersByProduct, customerRanking} = require('../utils/calculationUtils')

const api = supertest(app)

const sampleData = {
    customers:[
        {id: '0', firstname: 'John', lastname: 'Maxwell'},
        {id: '1', firstname: 'James', lastname: 'Fermi'},
        {id: '2', firstname: 'Ringo', lastname: 'Heisenberg'},
        {id: '3', firstname: 'Thomas', lastname: 'Smith'}
    ],
    products:[
        {id: '0', name: 'screwdriver', cost: '2.98'},
        {id: '1', name: 'wrench', cost: '6.49'},
        {id: '2', name: 'hammer', cost: '2.90'},
        {id: '3', name: 'candle', cost: '9.80'}
    ],
    orders:[
        {id: '0', customer: '0', products: '1 0 1 0'},
        {id: '1', customer: '1', products: '2'},
        {id: '2', customer: '0', products: '2 1 1 0'},
        {id: '3', customer: '2', products: '0 0'},
    ]
}

describe('TESTS UNITARIOS - ALGORITMOS', () => {

    describe('Algoritmo 1: "totalCost"', () => {
        const res = totalCost(sampleData.products, sampleData.orders)

        test('Devuelve un resultado para todos los clientes', () => {
            expect(res.length).toEqual(sampleData.orders.length)
        })

        test('Devuelve la suma de todos los productos como "total"', () => {
            expect(res[0].total).toEqual(2.98 + 6.49 + 2.98 + 6.49)
            expect(res[1].total).toEqual(2.90)
            expect(res[2].total).toEqual(2.90 + 6.49 + 6.49 + 2.98)
            expect(res[3].total).toEqual(2.98 + 2.98)
        })
    })

    describe('Algoritmo 2: "customersByProduct"', () => {

        const res = customersByProduct(sampleData.products, sampleData.orders)

        test('Si un producto no ha sido comprado se devuelve una String vacia', () => {
            
            expect(res[3].customer_ids).toEqual('')
        })

        test('Devuelve los productos comprados por cada cliente"', () => {

            expect(res[0].customer_ids).toEqual('0 0 2')
            expect(res[1].customer_ids).toEqual('0 0')
            expect(res[2].customer_ids).toEqual('1 0')
        })
    })

    describe('Algoritmo 3: "customerRanking"', () => {
        const ordersCost = totalCost(sampleData.products, sampleData.orders)
        const res = customerRanking(ordersCost, sampleData.customers)

        test('Si un cliente no ha hecho ningun pedido, su total es de 0', () => {
            const customer = res.find(p => p.name === 'Thomas')
            expect(customer.total).toEqual(0)
        })

        test('Devuelve el precio total de todos los pedidos', () => {
            const customer1 = res.find(p => p.name === 'John')
            const customer2 = res.find(p => p.name === 'James')
            const customer3 = res.find(p => p.name === 'Ringo')

            expect(customer1.total).toEqual(ordersCost[0].total + ordersCost[2].total)
            expect(customer2.total).toEqual(ordersCost[1].total)
            expect(customer3.total).toEqual(ordersCost[3].total)
        })

        test('Los clientes están ordenados de forma descendente respecto al total de coste de los pedidos', () => {

            for(i = 0; i < res.length - 1; i++){
                expect(res[i].total).toBeGreaterThanOrEqual(res[i + 1].total)
            }
            
        })
    }) 
})

describe('API TESTS', () => {
    
    test('La respuesta debe ser un JSON', async() => {
        await api
        .post("/api")
        .send(sampleData)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })  

    test('Si falta un archivo, la respuesta debe informar de ello', async() => {
        const response = await api
        .post("/api")
        .send({
                customers:[{id: '0', firstname: 'John', lastname: 'Maxwell'}],
                products:[{id: '0', name: 'screwdriver', cost: '2.98'}]
            })
        .expect(400)
        expect(response.body.error).toBe('Faltan uno o más archivos')
    })   

    test('Si un archivo está vacio, la respuesta debe informar de ello', async() => {
        const response = await api
        .post("/api")
        .send({
                customers:[{id: '0', firstname: 'John', lastname: 'Maxwell'}],
                products:[],
                orders:[{id: '0', customer: '0', products: '1 0 1 0'}]
            })
        .expect(400)
        expect(response.body.error).toBe('Uno o más archivos se encuentran vacios')

    })      
})