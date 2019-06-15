import request from 'utils/request'
import axios from 'axios'
import {
  URL,
  APP_KEY,
  setSign,
  getparams
} from './config'
// import store from 'store'

const modelName = 'okayapi_article_comment'

export function commentCreate (d) {
  const data = {
    s: 'App.Table.Create',
    model_name: modelName,
    data: JSON.stringify(d),
    app_key: APP_KEY
  }
  return request({
    url: URL,
    method: 'post',
    data: getparams(data)
  })
}

export function getComment (val, page) {
  let data = {
    s: 'App.Table.FreeQuery',
    model_name: modelName,
    app_key: APP_KEY,
    where: JSON.stringify([
      ['message_key', '=', val]
    ])
  }
  if (page) {
    data.page = page
  } else {
    data.page = 1
  }
  data.sign = setSign(data)
  return axios.get(URL, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function commentCount (val) {
  let data = {
    s: 'App.Table.FreeCount',
    model_name: modelName,
    app_key: APP_KEY,
    where: JSON.stringify([
      ['message_key', '=', val]
    ])
  }
  data.sign = setSign(data)
  return axios.get(URL, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
