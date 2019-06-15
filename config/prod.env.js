'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  API_ROOT: '"http://hutingmao.top"'
  // API_ROOT: '"http://192.168.0.145:8888"'
})
