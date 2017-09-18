'use strict'

const vm = require('vm')
const Module = require('module')
var path = require('path')
var fs = require('fs')
var dependencyTree = require('dependency-tree')

module.exports = checkSyntax

function checkSyntax (entry) {
  return dependencyTree.toList({
    filename: require.resolve(entry),
    directory: path.dirname(entry),
    filter: p => p.indexOf('node_modules') === -1 && !/\.json$/.test(p)
  }).map(function (f) {
    try {
      checkScriptSyntax(fs.readFileSync(f).toString(), f)
    } catch (e) {
      var lines = e.stack.toString().split('\n')
      var loc = lines[0]
      var code = lines[1]
      var msg = e.message
      return {
        loc: loc,
        code: code,
        msg: msg
      }
    }
  }).filter(Boolean)
}

function checkScriptSyntax (source, filename) {
  source = stripShebang(source)
  source = stripBOM(source)
  source = Module.wrap(source)
  // compile the script, this will throw if it fails
  /* eslint-disable no-new */
  new vm.Script(source, { displayErrors: true, filename: filename })
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 * because the buffer-to-string conversion in `fs.readFileSync()`
 * translates it to FEFF, the UTF-16 BOM.
 */
function stripBOM (content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1)
  }
  return content
}

/**
 * Find end of shebang line and slice it off
 */
function stripShebang (content) {
  // Remove shebang
  var contLen = content.length
  if (contLen >= 2) {
    if (content.charCodeAt(0) === 35/* # */ &&
        content.charCodeAt(1) === 33/*! */) {
      if (contLen === 2) {
        // Exact match
        content = ''
      } else {
        // Find end of shebang line and slice it off
        var i = 2
        for (; i < contLen; ++i) {
          var code = content.charCodeAt(i)
          if (code === 10/* \n */ || code === 13/* \r */) { break }
        }
        if (i === contLen) { content = '' } else {
          // Note that this actually includes the newline character(s) in the
          // new output. This duplicates the behavior of the regular expression
          // that was previously used to replace the shebang line
          content = content.slice(i)
        }
      }
    }
  }
  return content
}
