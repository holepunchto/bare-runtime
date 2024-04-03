const path = require('path')

module.exports = function runtime (referrer, opts) {
  if (typeof referrer === 'object' && referrer !== null) {
    opts = referrer
    referrer = 'bare'
  } else if (typeof referrer !== 'string') {
    referrer = 'bare'
  }

  if (!opts) opts = {}

  const {
    platform = process.platform,
    arch = process.arch
  } = opts

  const filename = path.basename(referrer)

  const base = `bare-runtime-${platform}-${arch}`

  let mod
  try {
    mod = require.resolve(`${base}/package.json`)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error(`No binary found for target '${platform}-${arch}'`)
    } else {
      throw err
    }
  }

  return path.join(mod, '..', require(mod).bin[filename])
}
