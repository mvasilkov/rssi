var fmt   = require('../rssi'),        // load rssi
    hello = fmt('hello, #{thing}'),    // compile template
    msg   = hello({thing: 'shawarma'}) // format message

console.log(msg) // -> hello, shawarma
