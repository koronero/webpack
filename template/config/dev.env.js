'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"//www.mmbang.net/api/v2"',
  API_ROOT: '"//webapi.mmbang.me"',
  API_TEST: '"//www.mmbang.net/api/v2"'
})
