var assert = require('assert'),
    fmt = require('../rssi')

String.prototype.equal = function (arg) { assert.strictEqual('' + this, arg) }

describe('subterfuge', function () {
    it('should handle awkward variable names', function () {
        fmt('#{} #{&} #{         }')({
            '': 'null',
            '&': 'and',
            '         ': 'void'
        }).equal('null and void')

        fmt('#{\t\t\t}#{\n}#{\n\n\n}')({
            '\n': '\n',
            '\n\n\n': 'Arimeka',
            '\t\t\t': 'Navi'
        }).equal('Navi\nArimeka')
    })

    it('should work with inherited method names', function () {
        /* jshint -W001 */
        fmt('#{hasOwnProperty}')({hasOwnProperty: 'omg'}).equal('omg')
        fmt('#{toString}')({toString: 'wtf'}).equal('wtf')
        fmt('#{valueOf}')({valueOf: 'bbq'}).equal('bbq')
    })

    it('should retain #{fmt} for undefined vars', function () {
        var t = fmt('#{2} #{X} #{4}')

        t({'2': '2', '4': '4'}).equal('2 #{X} 4')
        t({'9': '9', 'X': 'X'}).equal('#{2} X #{4}')
        t(function fgsfds() {}).equal('#{2} #{X} #{4}')
    })

    it('should disregard nested format strings', function () {
        var t = fmt('win#{r#{a}r}')

        t({}).equal('win#{r#{a}r}')
        t({a: 'a'}).equal('win#{r#{a}r}')
        t({'r#{a': 'ra'}).equal('winrar}')
    })

    it('should retain 0', function () {
        var t = fmt('#{zero}')

        t({zero: 0}).equal('0')
    })
})
