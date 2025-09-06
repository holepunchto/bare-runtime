const fs = require('fs')
const childProcess = require('child_process')
const runtime = require('..')

module.exports = function spawn(referrer, opts) {
  if (typeof referrer === 'object' && referrer !== null) {
    opts = referrer
    referrer = 'ninja'
  } else if (typeof referrer !== 'string') {
    referrer = 'ninja'
  }

  if (!opts) opts = {}

  const {
    args = typeof Bare !== 'undefined'
      ? Bare.argv.slice(2)
      : process.argv.slice(2)
  } = opts

  const bin = runtime(referrer, opts)

  try {
    fs.accessSync(bin, fs.constants.X_OK)
  } catch {
    fs.chmodSync(bin, 0o755)
  }

  return childProcess.spawn(bin, args, opts)
}
