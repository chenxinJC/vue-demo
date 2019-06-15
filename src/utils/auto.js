export function getUsername () {
  return localStorage.getItem('currentUser_username')
}

export function setUsername (username) {
  return localStorage.setItem('currentUser_username', username)
}

export function removeUsername () {
  return localStorage.removeItem('currentUser_username')
}

export function getPassword () {
  return localStorage.getItem('currentUser_password')
}

export function setPassword (password) {
  return localStorage.setItem('currentUser_password', password)
}

export function removePassword () {
  return localStorage.removeItem('currentUser_password')
}

export function getToken () {
  return localStorage.getItem('currentUser_token')
}

export function setToken (token) {
  return localStorage.setItem('currentUser_token', token)
}

export function removeToken () {
  return localStorage.removeItem('currentUser_token')
}

export function getUuid () {
  return localStorage.getItem('currentUser_uuid')
}

export function setUuid (uuid) {
  return localStorage.setItem('currentUser_uuid', uuid)
}

export function removeUuid () {
  return localStorage.removeItem('currentUser_uuid')
}

export function getRole () {
  return localStorage.getItem('currentUser_role')
}

export function setRole (role) {
  return localStorage.setItem('currentUser_role', role)
}

export function removeRole () {
  return localStorage.removeItem('currentUser_role')
}

export function getExtInfo () {
  return localStorage.getItem('currentUser_ext_info')
}

export function setExtInfo (extInfo) {
  return localStorage.setItem('currentUser_ext_info', JSON.stringify(extInfo))
}

export function removeExtInfo () {
  return localStorage.removeItem('currentUser_ext_info')
}

export function removeAll () {
  return ls()
}

export function ls () {
  localStorage.removeItem('currentUser_uuid')
  localStorage.removeItem('currentUser_token')
  localStorage.removeItem('currentUser_role')
  localStorage.removeItem('currentUser_ext_info')
  localStorage.removeItem('currentUser_username')
  localStorage.removeItem('currentUser_password')
}

export function fs (f) {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  let fontSize = htmlWidth / 10
  fontSize = fontSize > 60 ? 60 : fontSize
  return f / 37.5 * fontSize
}
