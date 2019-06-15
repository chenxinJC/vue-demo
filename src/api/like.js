import request from 'utils/request'
import axios from 'axios'
import {
  URL,
  APP_KEY,
  setSign,
  getparams
} from './config'
import store from 'store'

export function likeCreate (modelName, d) {
  const data = {
    s: 'App.Table.Create',
    model_name: modelName,
    data: JSON.stringify(d),
    app_key: APP_KEY,
    uuid: store.getters.uuid,
    token: store.getters.token
  }
  return request({
    url: URL,
    method: 'post',
    data: getparams(data)
  })
}

export function likeCheckCreate (modelName, d, field) {
  const data = {
    s: 'App.Table.CheckCreate',
    model_name: modelName,
    data: JSON.stringify(d),
    check_field: field,
    app_key: APP_KEY,
    uuid: store.getters.uuid,
    token: store.getters.token
  }
  return request({
    url: URL,
    method: 'post',
    data: getparams(data)
  })
}

export function likeUpdate (modelName, id, d) {
  const data = {
    s: 'App.Table.Update',
    model_name: modelName,
    id,
    data: JSON.stringify(d),
    app_key: APP_KEY,
    uuid: store.getters.uuid,
    token: store.getters.token
  }
  return request({
    url: URL,
    method: 'post',
    data: getparams(data)
  })
}

export function getLike (modelName, key, val) {
  let data = {
    s: 'App.Table.FreeQuery',
    model_name: modelName,
    app_key: APP_KEY,
    uuid: store.getters.uuid,
    token: store.getters.token
  }
  if (key && val) {
    data.where = JSON.stringify([
      [key, '=', val]
    ])
  } else {
    data.where = JSON.stringify([
      ['id', '>=', '0']
    ])
  }
  data.sign = setSign(data)
  return axios.get(URL, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function likeDelete (modelName, id) {
  const data = {
    s: 'App.Table.Delete',
    model_name: modelName,
    id,
    app_key: APP_KEY,
    uuid: store.getters.uuid,
    token: store.getters.token
  }
  return request({
    url: URL,
    method: 'post',
    data: getparams(data)
  })
}

export function likedeleteAll (modelName) {
  const data = {
    s: 'App.Table.FreeDelete',
    model_name: modelName,
    app_key: APP_KEY,
    uuid: store.getters.uuid,
    token: store.getters.token,
    where: JSON.stringify([
      ['id', '>=', '0']
    ])
  }
  return request({
    url: URL,
    method: 'post',
    data: getparams(data)
  })
}
