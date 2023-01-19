const { totalCost, customersByProduct, customerRanking } = require("../utils/calculationUtils.js")

const generateData = (customers, products, orders) => {
    try{
        const orderCost = totalCost(products, orders)
        const customersProducts = customersByProduct(products, orders)
        const customersPaidAmount = customerRanking(orderCost, customers)
        
        orderCost.map(p => delete p.customer)

        return {orderCost, customersProducts, customersPaidAmount}
    }catch(error){
        console.log('catched')
        throw error
    }
}

module.exports = {generateData}