var assert = require('assert')
var rssi = require('../rssi.js')

describe('rssi:basic', function () {
    it('is a function', function () { assert.equal(typeof rssi, 'function') })

    it('returns a function returning string', function () {
        var res = rssi('nothing')
        assert.equal(typeof res, 'function')
        assert.equal(typeof res({}), 'string')
    })

    it('retains plain text', function () {
        var chickens = { chickens: 'chickens' }
        assert.strictEqual(rssi('')(chickens), '')
        assert.strictEqual(rssi('{{ mustache }}')(chickens), '{{ mustache }}')
        assert.strictEqual(rssi('$chickens')(chickens), '$chickens')
    })

    it('interpolates things', function () {
        var sub1 = { from: 'meters', to: 'feet', mul: 3.28 }
        var sub2 = { from: 'kilojoules', to: 'BTUs', mul: 0.9478 }
        var sub3 = { from: 'megabytes', to: 'gigabytes', mul: 1024 }
        var test = rssi('Multiply by #{mul} to convert from #{from} to #{to}.')

        assert.strictEqual(test(sub1), 'Multiply by 3.28 to convert from meters to feet.')
        assert.strictEqual(test(sub2), 'Multiply by 0.9478 to convert from kilojoules to BTUs.')
        assert.strictEqual(test(sub3), 'Multiply by 1024 to convert from megabytes to gigabytes.')
    })

    it('handles repeating arguments', function () {
        var test = rssi('#{a} #{b} #{a} #{b}')
        assert.strictEqual(test({a: 'a', b: 'b'}), 'a b a b')
    })
})
