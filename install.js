#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const mod = require.resolve('@holepunchto/bare-runtime-' + process.platform + '-' + process.arch + '/package.json')

// bare.exe is a windows hack
const bin = path.join(__dirname, 'bin', 'bare.exe')

if (fs.existsSync(bin)) fs.unlinkSync(bin)

if (process.platform !== 'win32') {
  fs.linkSync(path.join(mod, '../bare'), bin)
} else {
  fs.writeFileSync(path.join(mod, '../bare.exe'), fs.readFileSync(bin))
}
