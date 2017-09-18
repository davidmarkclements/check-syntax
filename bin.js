#!/usr/bin/env node
'use strict'

var path = require('path')
var report = require('./report')
var entry = process.argv[2]
var cwd = process.cwd()
var fullPath = path.join(cwd, entry)

report(fullPath)
