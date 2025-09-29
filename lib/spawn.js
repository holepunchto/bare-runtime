const fs = require('fs')
const os = require('os')
const process = require('process')
const childProcess = require('child_process')
const runtime = require('..')

module.exports = function spawn(referrer, opts) {
  if (typeof referrer === 'object' && referrer !== null) {
    opts = referrer
    referrer = 'bare'
  } else if (typeof referrer !== 'string') {
    referrer = 'bare'
  }

  if (!opts) opts = {}

  const {
    suppressSignals = false,
    forwardExitCode = false,
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

  const job = childProcess.spawn(bin, args, opts)

  if (suppressSignals) {
    process.on('SIGINT', onsignal).on('SIGTERM', onsignal)

    job.once('exit', () => {
      process.off('SIGINT', onsignal).off('SIGTERM', onsignal)
    })
  }

  if (forwardExitCode) {
    job.once('exit', (code, signal) => {
      if (signal) {
        process.exitCode = 0x80 | os.constants.signals[signal]
      } else {
        process.exitCode = code
      }
    })
  }

  return job
}

function onsignal() {}
