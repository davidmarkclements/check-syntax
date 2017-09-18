'use strict'

var checkSyntax = require('.')

module.exports = report

function report (entry, pass) {
  var syntaxFailures = checkSyntax(require.resolve(entry))

  if (syntaxFailures.length === 0) {
    console.log('Passed:', entry)
    if (typeof pass === 'function') return void pass(true)
    else process.exit(0)
  }

  console.log('Failed', entry)

  console.log(
    syntaxFailures
      .map(function (o) {
        return '  SyntaxError: ' + o.msg + '\n  Location: ' + o.loc + '\n  Code: ' + o.code + '\n'
      })
      .join('\n')
  )

  if (typeof pass === 'function') pass(false)
  else process.exit(1)
}
