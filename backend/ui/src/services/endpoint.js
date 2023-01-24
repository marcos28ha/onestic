import axios from 'axios'

const BASE_URL = '/api'

const sendFiles = async(filesJSON) => {
  try{
  const res = await axios.post(BASE_URL, filesJSON)
  return res
  }catch(res){
    return res.response
  }
}

export {sendFiles}