const os = require('os')
const path = require('path')

module.exports = function runtime(referrer, opts) {
  if (typeof referrer === 'object' && referrer !== null) {
    opts = referrer
    referrer = 'bare'
  } else if (typeof referrer !== 'string') {
    referrer = 'bare'
  }

  if (!opts) opts = {}

  const { platform = os.platform(), arch = os.arch() } = opts

  const filename = path.basename(referrer)

  let mod
  try {
    mod = require(`bare-runtime-${platform}-${arch}`)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error(`No binaries found for target '${platform}-${arch}'`)
    } else {
      throw err
    }
  }

  if (filename in mod === false) {
    throw new Error(
      `No binary found for target '${platform}-${arch}' for referrer '${referrer}'`
    )
  }

  return mod[filename]
}
