#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const { platform, arch } = process

const mod = require.resolve(`@holepunchto/bare-runtime-${platform}-${arch}/package.json`)

const bin = path.join(mod, '..', require(mod).bin.bare)

fs.copyFileSync(bin, path.join(__dirname, 'bin', 'bare'))
