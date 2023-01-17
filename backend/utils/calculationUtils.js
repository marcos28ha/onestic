const totalCost = (productsList, orders) => {
    let result = []
    orders.forEach((order) => {
        let productsArray = order.products.split(" ")
        let costArray = productsArray.map(function (product){
            let res = productsList.find(p => p.id == product)
            return Number(res.cost)
        })
        const orderCost = costArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        );
        result.push({id: Number(order.id), customer: order.customer, total: orderCost})
    })
    return result
}

const customersByProduct = (products, orders) => {
    let result = []
    products.forEach((product)=>{
        let customersArray = []
        orders.forEach((order) => {
            let productArray = order.products.split(" ")
            if(productArray.includes(product.id)){
                customersArray.push(order.customer)
            }
        })
        let customers = customersArray.join(' ')
        result.push({id: product.id, customer_ids: customers})
    })
    return result
}

const customerRanking = (orderCost, customers) => {
    let result = []
    customers.forEach((customer) => {
        let totalSum = 0
        orderCost.forEach((order) => {
            if(order.customer == customer.id){
                totalSum += Number(order.total)
            }
        })
        result.push({id: customer.id, name: customer.firstname, lastname: customer.lastname, total: totalSum})
    })

    result.sort(function compareFn(a, b) {
        return a.total < b.total ? 1 : -1
    })

    return result
}



module.exports = {totalCost, customersByProduct, customerRanking}