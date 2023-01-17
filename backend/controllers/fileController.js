const { totalCost, customersByProduct, customerRanking } = require("../utils/calculationUtils.js")

const generateData = (customers, products, orders) => {

    const orderCost = totalCost(products, orders)
    const customersProducts = customersByProduct(products, orders)
    const customersPaidAmount = customerRanking(orderCost, customers)
    
    orderCost.map(p => delete p.customer)

    return {orderCost, customersProducts, customersPaidAmount}
}

module.exports = {generateData}