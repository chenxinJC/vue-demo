import md5 from 'js-md5'
import {ERR_OK} from 'api/config'
// import router from '../../router/index'
import {
  login,
  getUserInfo,
  getUserStatus,
  updateExtInfo
} from 'api/user'
import {
  getUsername,
  setUsername,
  getPassword,
  setPassword,
  getToken,
  setToken,
  getUuid,
  setUuid,
  getRole,
  setRole,
  getExtInfo,
  setExtInfo,
  removeAll
} from 'utils/auto'
const extInfo = JSON.parse(getExtInfo())
const user = {
  state: {
    ext_info: extInfo || {},
    register_ip: '',
    register_time: '',
    role: getRole() || '',
    rolename: '',
    username: getUsername() || '',
    password: getPassword() || '',
    uuid: getUuid() || '',
    token: getToken() || ''
  },

  mutations: {
    SET_EXT_INFO: (state, extInfo) => {
      state.ext_info = Object.assign({}, extInfo)
    },
    SET_REGISTER_IP: (state, registerIp) => {
      state.register_ip = registerIp
    },
    SET_REGISTER_TIME: (state, registerTime) => {
      state.register_time = registerTime
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_ROLENAME: (state, rolename) => {
      state.rolename = rolename
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_PASSWORD: (state, password) => {
      state.password = password
    }
  },

  actions: {
    // 用户名登录
    Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = md5(userInfo.password)
      return new Promise((resolve, reject) => {
        login(username, password).then((res) => {
          let token = res.data.data.token
          let uuid = res.data.data.uuid
          commit('SET_TOKEN', token)
          commit('SET_UUID', uuid)
          commit('SET_USERNAME', username)
          commit('SET_PASSWORD', password)
          setToken(token)
          setUuid(uuid)
          setUsername(username)
          setPassword(password)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 用户登录状态
    GetUserStatus ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserStatus(state.uuid, state.token).then(res => {
          if (res) {
            if (res.data.data.err_code === ERR_OK) {
              return false
            } else {
              resolve(res)
            }
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.uuid, state.token).then(res => {
          if (res) {
            if (res.data.err_code === ERR_OK) {
              return false
            }
            const data = res.data.data.info
            commit('SET_ROLE', data.role)
            commit('SET_EXT_INFO', data.ext_info)
            commit('SET_REGISTER_TIME', data.register_time)
            commit('SET_ROLENAME', data.rolename)
            commit('SET_USERNAME', data.username)
            setRole(data.role)
            setExtInfo(data.ext_info)
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

    UpdateExtInfo ({ commit, state }, extinfo) {
      return new Promise((resolve, reject) => {
        updateExtInfo(state.uuid, state.token, extinfo).then(res => {
          const data = res.data.data
          commit('SET_EXT_INFO', data.ext_info)
          setExtInfo(data.ext_info)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 用户登出
    Logout ({ commit, state }) {
      removeAll()
      commit('SET_TOKEN', '')
      commit('SET_UUID', '')
      commit('SET_USERNAME', '')
      commit('SET_ROLE', '')
      commit('SET_EXT_INFO', {})
      // router.push({ path: '/login' })
    }
  }
}

export default user
