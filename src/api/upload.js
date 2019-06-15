import axios from 'axios'
import {
  APP_KEY,
  getFormData
} from './config'

export function upload (file) {
  const data = {
    s: 'App.CDN.UploadImg',
    app_key: APP_KEY,
    file
  }
  return axios({
    url: 'api/',
    method: 'post',
    data: getFormData(data),
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
