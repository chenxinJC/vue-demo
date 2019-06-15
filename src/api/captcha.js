import axios from 'axios'
import {
  APP_KEY,
  setSign,
  getparams
} from './config'

const url = 'api/'

export function captcha () {
  const data = {
    s: 'App.Captcha.Create',
    app_key: APP_KEY,
    return_format: 'data'
  }
  data.sign = setSign(data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}

export function captchaVerify (captchaId, captchaCode) {
  const data = {
    s: 'App.Captcha.Verify',
    app_key: APP_KEY,
    captcha_id: captchaId,
    captcha_code: captchaCode
  }
  return axios({
    method: 'post',
    url,
    data: getparams(data)
  }).then((res) => {
    return Promise.resolve(res.data.data)
  })
}
