'use strict'

var checkSyntax = require('.')

module.exports = report

function report (entry) {
  var syntaxFailures = checkSyntax(require.resolve(entry))

  if (syntaxFailures.length === 0) {
    console.log('Passed:', entry)
    process.exit(0)
  }

  console.log('Failed', entry)

  console.log(
    syntaxFailures
      .map(function (o) {
        return '  SyntaxError: ' + o.msg + '\n  Location: ' + o.loc + '\n  Code: ' + o.code
      })
      .join('\n')
  )

  process.exit(1)
}
