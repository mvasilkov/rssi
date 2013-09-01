var assert = require('assert'),
    fmt = require('../rssi')

String.prototype.equal = function (arg) { assert.strictEqual(this, arg) }

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

    it('should handle all variable types', function () {
        fmt()().equal('')
        fmt('')().equal('')
        fmt(null)().equal('')
        fmt(false)().equal('')
        fmt(true)().equal('')
        fmt(NaN)().equal('')
        fmt(Infinity)().equal('')
        fmt(0)().equal('')
        fmt(1)().equal('')
        fmt([1,2])().equal('')
        fmt({a:1})().equal('')

    })
})
