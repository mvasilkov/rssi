var assert = require('assert')
var rssi = require('../rssi.js')

describe('rssi:cache', function () {
    var opt_nc = { noCache: true }
    var opt_b = { blank: true }
    var opt_nc_b = { noCache: true, blank: true }

    it('caches templates', function () {
        assert.strictEqual(rssi('nothing'), rssi('nothing'))
        assert.notEqual(rssi('nothing'), rssi('chickens'))

        assert.strictEqual(rssi('#{a}'), rssi('#{a}'))
        assert.notEqual(rssi('#{a}'), rssi('#{b}'))

        assert.strictEqual(rssi('#{a}', opt_b), rssi('#{a}', opt_b))
        assert.notEqual(rssi('#{a}', opt_b), rssi('#{b}', opt_b))

        assert.notEqual(rssi('chickens'), rssi('chickens', opt_b))
        assert.notEqual(rssi('#{a}'), rssi('#{a}', opt_b))
    })

    it('accepts the `noCache` option', function () {
        assert.notEqual(rssi('chickens'), rssi('chickens', opt_nc))
        assert.notEqual(rssi('chickens', opt_nc), rssi('chickens'))
        assert.notEqual(rssi('chickens', opt_nc), rssi('chickens', opt_nc))

        assert.notEqual(rssi('#{a}'), rssi('#{a}', opt_nc))
        assert.notEqual(rssi('#{a}', opt_nc), rssi('#{a}'))
        assert.notEqual(rssi('#{a}', opt_nc), rssi('#{a}', opt_nc))

        assert.notEqual(rssi('#{b}', opt_b), rssi('#{b}', opt_nc_b))
        assert.notEqual(rssi('#{b}', opt_nc_b), rssi('#{b}', opt_b))
        assert.notEqual(rssi('#{b}', opt_nc_b), rssi('#{b}', opt_nc_b))
    })
})
