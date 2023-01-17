import axios from 'axios'

const BASE_URL = 'http://localhost:3001/'

const sendFiles = async(filesJSON) => {
  const res = await axios.post(BASE_URL, filesJSON)
  return res
}

export {sendFiles}