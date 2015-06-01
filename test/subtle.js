var assert = require('assert')
var rssi = require('../rssi.js')

describe('rssi:subtle', function () {
    it('retains `0`', function () {
        assert.strictEqual(rssi('x=#{x}')({x: 0}), 'x=0')
    })
})
