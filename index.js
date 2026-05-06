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
  const pkg = `bare-runtime-${platform}-${arch}`

  let pkgDir
  try {
    pkgDir = path.dirname(require.resolve(`${pkg}/package`))
  } catch (err) {
    if (isModuleNotFound(err, `${pkg}/package`)) {
      throw new Error(`No binaries found for target '${platform}-${arch}'`)
    } else {
      throw err
    }
  }

  const bin = resolvePackageBin(pkgDir, filename)

  if (bin !== null) return bin

  const mod = require(pkgDir)

  if (filename in mod === false) {
    throw new Error(`No binary found for target '${platform}-${arch}' for referrer '${referrer}'`)
  }

  return mod[filename]
}

function isModuleNotFound(err, request) {
  return (
    err &&
    err.code === 'MODULE_NOT_FOUND' &&
    err.message.startsWith(`Cannot find module '${request}'`)
  )
}

function resolvePackageBin(pkgDir, filename) {
  const pkg = require(path.join(pkgDir, 'package.json'))
  const bin = pkg.bin && pkg.bin[filename]

  return typeof bin === 'string' ? path.join(pkgDir, bin) : null
}
