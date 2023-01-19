import logo from './logo.svg';
import { sendFiles } from './services/endpoint'
import { useState } from 'react';
import { getDataFromFile, createFileFromData } from './services/fileService'
import fileDownload from 'react-file-download'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
        <Header/>
        <div id={'content'}>
          <div>
            <div id={'submitionBox'}>
              <FileSubmmiter fileName={'Clientes'} fileData= {customersFile} handleOnFileUpload={setHandleOnFileUpload(setCustomersFile)}/>
              <FileSubmmiter fileName={'Productos'} fileData= {productsFile} handleOnFileUpload={setHandleOnFileUpload(setProductsFile)}/>
              <FileSubmmiter fileName={'Pedidos'} fileData= {ordersFile} handleOnFileUpload={setHandleOnFileUpload(setOrdersFile)}/>
            </div>
            <RequestSender customersFile={customersFile} productsFile={productsFile} ordersFile={ordersFile}/>
          </div>
        </div>
      </div>
    )
}

const FileSubmmiter = ({fileName, handleOnFileUpload}) => {

  return(
    <div className={'submition'}>
      <div><h2>{fileName}</h2></div>
      <input className={'form-control'} type='file'
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
    <div id={'buttonDiv'}>
      <button disabled={customersFile.length === 0 || productsFile.length === 0 || ordersFile.length === 0} onClick={sendData}>Generar archivos</button>
    </div>
  )
}

const Header = () => {


  return(
    <div id={'header'}>
      <h1>Generador de estadísticas</h1>
    </div>
  )
}

export default App;
