var assert = require('assert')
var rssi = require('../rssi.js')

describe('rssi:blank', function () {
    it('retains useless formatting', function () {
        var test = rssi('#{a} #{b}')
        assert.strictEqual(test(), '#{a} #{b}')
        assert.strictEqual(test({}), '#{a} #{b}')
        assert.strictEqual(test({a: 'a'}), 'a #{b}')
        assert.strictEqual(test({b: 'b'}), '#{a} b')
    })

    it('accepts the `blank` option', function () {
        var opt_b = { blank: true }
        var chickens = { chickens: 'chickens' }

        assert.strictEqual(rssi('<#{a}>', opt_b)(), '<>')
        assert.strictEqual(rssi('<#{a}>', opt_b)({}), '<>')
        assert.strictEqual(rssi('<#{a}>', opt_b)(chickens), '<>')
        assert.strictEqual(rssi('nobody here but #{us} #{chickens}', opt_b)(chickens),
                           'nobody here but  chickens')
    })
})
