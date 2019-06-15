import md5 from 'js-md5'

export const ERR_OK = 0

export const URL = 'api/'

/* app_key */
export const APP_KEY = '87238C4CC32ED34A328C9BEB90EFCEBD'

/* 密钥 -- app_secrect */
export const APP_SECRECT = 'LGpJnTG5WEa3i8U0Rw9rh4hivT7gef4soMEuzH0QaXj4cTLf5Rhs1bSxGD0hn'

/* 签名 -- sign */
export function setSign (obj) {
  var newkey = Object.keys(obj).sort()
  var newObj = {}
  var keys = []
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]]
  }
  for (var k in newObj) {
    keys.push(newObj[k])
  }
  var s = keys.join('') + APP_SECRECT
  return md5(s).toLocaleUpperCase()
}

/* post -- 数据params */
export function getparams (data) {
  data.sign = setSign(data)
  let params = new URLSearchParams()
  for (let k in data) {
    params.append(k, data[k])
  }
  return params
}

/* post -- 数据formData */
export function getFormData (data) {
  data.sign = setSign(data)
  let formData = new FormData()
  for (let k in data) {
    formData.append(k, data[k])
  }
  return formData
}
