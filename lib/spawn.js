const path = require('path')

module.exports = function spawn (referrer, opts = {}) {
  const {
    platform = process.platform,
    arch = process.arch
  } = opts

  const filename = path.basename(referrer)

  const base = `@holepunchto/bare-runtime-${platform}-${arch}`

  let mod
  try {
    mod = require.resolve(`${base}/package.json`)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error(`No binary found for target ${platform}-${arch}`)
    } else {
      throw err
    }
  }

  const pkg = require(mod)

  const bin = path.join(mod, '..', pkg.bin[filename])

  try {
    require('child_process').execFileSync(bin, process.argv.slice(2), { stdio: 'inherit' })
  } catch (err) {
    process.exitCode = err.status
  }
}
