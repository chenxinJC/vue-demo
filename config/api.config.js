const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isPro ? 'http://hb9.api.okayapi.com/api' : 'api'
}
