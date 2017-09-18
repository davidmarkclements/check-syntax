# check-syntax

Checks the syntax of an entry point and it's (application-level) dependencies 
as per the currently installed Node version.

## About

The `node -c` command allows us to check the syntax of a single file.

The `check-syntax` module allows us to check the syntax of all the files
in a dependency tree (excluding any dependencies in the `node_modules` folder).

## CLI

### Install 

```sh
npm install -g check-syntax
```

### Use

```sh
check-syntax <entry-point>
```

## API

### Install

```sh
npm install check-syntax
```

### Use

```js
var checkSyntax = require('check-syntax')
var someEntryPoint = 'my/js/file.js'
console.log(checkSyntax(someEntryPoint)) // outputs an array of objects, {loc, code, msg}
```

#### Reporter 

To use the CLI reporter programatically:

```js
var report = require('check-syntax/report')
var someEntryPoint = 'my/js/file.js'
report(someEntryPoint) // same as output as check-syntax command
```



### License

MIT