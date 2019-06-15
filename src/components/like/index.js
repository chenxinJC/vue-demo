import { likeCreate, likeUpdate } from 'api/like'
import { updateArticle } from 'api/article'
import store from '../../store'
import router from '../../router'

export function like (type, state, num, pid, id, data, modelName) {
  let obj = {}
  obj[type + 'Num'] = num
  if (store.getters.token.length > 0 && store.getters.uuid.length > 0 && store.getters.role.length > 0) {
    if (id) {
      Promise.all([likeUpdate(modelName, id, { state }), updateArticle(pid, obj)]).then(res => {
        let r1 = res[0].data.data
        let r2 = res[1].data.data
        if (r1.err_code === 0 && r2.err_code === 0) {
          data[type + 'Num'] = num
          data[type + 'State'] = state
        }
      })
    } else {
      Promise.all([likeCreate(modelName, { message_key: pid, state }), updateArticle(pid, obj)]).then(res => {
        let r1 = res[0].data.data
        let r2 = res[1].data.data
        if (r1.err_code === 0 && r2.err_code === 0) {
          data[type + 'ID'] = r1.id
          data[type + 'State'] = '1'
          data[type + 'Num'] = num
        }
      })
    }
  } else {
    router.push('/login')
  }
}
