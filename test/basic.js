var should = require('should'),
    fmt = require('../rssi')

function eq(a, b) { a.should.equal(b) }

describe('rssi', function () {
    it('should be a function', function () { fmt.should.be.a('function') })

    it('should return function returning string', function () {
        var t = fmt('')
        t.should.be.a('function')
        t({}).should.be.a('string')
    })

    it('should retain plain text', function () {
        eq(fmt('')({foo: 'bar'}), '')
        eq(fmt('{{mustache}}')({foo: 'bar'}), '{{mustache}}')
        eq(fmt('#define foo bar')({foo: 'bar'}), '#define foo bar')
    })

    it('should interpolate things', function () {
        var c1 = {from: 'meters', to: 'feet', mul: 3.28},
            c2 = {from: 'kilojoules', to: 'BTUs', mul: 0.9478},
            c3 = {from: 'megabytes', to: 'gigabytes', mul: 1024},
            t = fmt('Multiply by #{mul} to convert from #{from} to #{to}.')

        eq(t(c1), 'Multiply by 3.28 to convert from meters to feet.')
        eq(t(c2), 'Multiply by 0.9478 to convert from kilojoules to BTUs.')
        eq(t(c3), 'Multiply by 1024 to convert from megabytes to gigabytes.')
    })
})
