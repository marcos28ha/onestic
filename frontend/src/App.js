import logo from './logo.svg';
import './App.css';
import { sendFiles } from './services/endpoint'
import { useState } from 'react';
import { getDataFromFile, createFileFromData } from './services/fileService'
import fileDownload from 'react-file-download' 

const App = () => {
  const [customersFile, setCustomersFile] = useState([])
  const [productsFile, setProductsFile] = useState([])
  const [ordersFile, setOrdersFile] = useState([])

  const setHandleOnFileUpload = (setFile) => {
    const handleOnFileUpload = async(event) => {
      try{
        const res = await getDataFromFile(event.target.files)
        setFile(res)
      }catch(error){console.log(error.msg)}
    }
    return handleOnFileUpload
  }

    return(
      <div>
        <h1>Archivos</h1>
        <FileSubmmiter fileName={'customers'} fileData= {customersFile} handleOnFileUpload={setHandleOnFileUpload(setCustomersFile)}/>
        <FileSubmmiter fileName={'products'} fileData= {productsFile} handleOnFileUpload={setHandleOnFileUpload(setProductsFile)}/>
        <FileSubmmiter fileName={'orders'} fileData= {ordersFile} handleOnFileUpload={setHandleOnFileUpload(setOrdersFile)}/>
        <RequestSender customersFile={customersFile} productsFile={productsFile} ordersFile={ordersFile}/>
      </div>
    )
}

const FileSubmmiter = ({fileName, fileData, handleOnFileUpload}) => {

  

  return(
    <div>
      <h2>{fileName}</h2>
      <input id={fileName + 'Uploader'} type='file' multiple
          accept='text/csv' onChange={(event) => handleOnFileUpload(event)}/>
    </div>
  )
}

const RequestSender = ({customersFile, productsFile, ordersFile}) => {

  const dataToSend = {customers: customersFile, products: productsFile, orders: ordersFile}

  const sendData = async() => {

    const res = await sendFiles(dataToSend) 

    const orderTotalFile = await createFileFromData(res.data.orderCost)
    const customersProducts = await createFileFromData(res.data.customersProducts)
    const customersPaidAmount = await createFileFromData(res.data.customersPaidAmount)
    
    fileDownload(orderTotalFile, 'order_prices.csv');
    fileDownload(customersProducts, 'product_customers.csv');
    fileDownload(customersPaidAmount, 'customer_ranking.csv');
    
  }

  return(
    <div>
      <button disabled={customersFile.length === 0 || productsFile.length === 0 || ordersFile.length === 0} onClick={sendData}>Send Files</button>
    </div>
  )
}

export default App;
