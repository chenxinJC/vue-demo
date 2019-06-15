import axios from 'axios'
import {
  APP_KEY,
  setSign,
  getparams
} from './config'

export function getArticle () {
  const url = 'api/'
  const data = {
    s: 'App.Table.FreeQuery',
    model_name: 'okayapi_article',
    where: JSON.stringify([
      ['id', '>=', '0']
    ]),
    app_key: APP_KEY
  }
  data.sign = setSign(data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function changeArticle (id, changeField, changeValue) {
  const data = {
    s: 'App.Table.ChangeNumber',
    model_name: 'okayapi_article',
    id,
    change_field: changeField,
    change_value: changeValue,
    app_key: APP_KEY
  }
  return axios({
    url: 'api/',
    method: 'post',
    data: getparams(data)
  })
}

export function updateArticle (id, d) {
  const data = {
    s: 'App.Table.FreeUpdate',
    model_name: 'okayapi_article',
    where: JSON.stringify([
      ['id', '=', id]
    ]),
    data: JSON.stringify(d),
    app_key: APP_KEY
  }
  return axios({
    url: 'api/',
    method: 'post',
    data: getparams(data)
  })
}

export function getArticleDetails (id, uuid) {
  const url = 'api/'
  const data = {
    s: 'App.Table.Get',
    model_name: 'okayapi_article',
    id,
    uuid,
    app_key: APP_KEY
  }
  data.sign = setSign(data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
