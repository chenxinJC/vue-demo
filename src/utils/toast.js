import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

export function cToast (data, s, t) {
  let msg, time
  if (s) {
    msg = s
  } else {
    msg = '提交成功'
  }
  if (t) {
    time = t
  } else {
    time = 2000
  }
  let type = data.err_code === 0 ? 'success' : 'text'
  let text = data.err_code === 0 ? msg : data.err_msg
  let width = data.err_code === 0 ? '8.2em' : '10em'
  Vue.$vux.toast.show({
    type,
    text,
    width,
    time,
    position: 'middle'
  })
}
