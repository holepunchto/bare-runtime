const runtime = require('..')

module.exports = function spawn (referrer, opts) {
  try {
    require('child_process').execFileSync(runtime(referrer, opts), process.argv.slice(2), { stdio: 'inherit' })
  } catch (err) {
    process.exitCode = err.status || 1
  }
}
