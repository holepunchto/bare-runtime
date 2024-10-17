/* global Bare */
const childProcess = require('child_process')
const runtime = require('..')

module.exports = function spawn (referrer, opts) {
  if (typeof referrer === 'object' && referrer !== null) {
    opts = referrer
    referrer = 'ninja'
  } else if (typeof referrer !== 'string') {
    referrer = 'ninja'
  }

  if (!opts) opts = {}

  const {
    args = typeof Bare !== 'undefined' ? Bare.argv.slice(2) : process.argv.slice(2)
  } = opts

  return childProcess.spawn(runtime(referrer, opts), args, opts)
}
