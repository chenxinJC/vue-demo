import axios from 'axios'
import {
  APP_KEY,
  setSign
} from './config'

export function getCourse (id) {
  const url = 'api/'
  const data = {
    s: 'App.Table.FreeQuery',
    model_name: 'course',
    where: JSON.stringify([
      ['id', '>=', '0']
    ]),
    app_key: APP_KEY
  }
  if (id) {
    data.where = JSON.stringify([
      ['id', '=', id]
    ])
  }
  data.sign = setSign(data)
  let aryList
  return axios.get(url, {
    params: data
  }).then((res) => {
    aryList = res
    let aryID = []
    let newAry = []
    aryList.data.data.list.forEach(val => {
      aryID.push(val.id)
    })
    aryID.forEach(val => {
      newAry.push(['course_key', '=', val])
    })
    return getCourseBuyUser(newAry)
  }).then(res => {
    for (let i = 0; i < aryList.data.data.list.length; i++) {
      aryList.data.data.list[i]['follow'] = []
      for (let j = 0; j < res.data.list.length; j++) {
        if (aryList.data.data.list[i].id === res.data.list[j].course_key) {
          aryList.data.data.list[i].follow.push(res.data.list[j])
        }
      }
    }
    return Promise.resolve(aryList.data)
  })
}

export function getCourseBuyUser (obj) {
  const url = 'api/'
  const data = {
    s: 'App.Table.FreeQuery',
    model_name: 'course_buy_user',
    logic: 'or',
    where: JSON.stringify(obj),
    app_key: APP_KEY
  }
  data.sign = setSign(data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
