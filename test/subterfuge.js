var should = require('should'),
    fmt = require('../rssi')

describe('subterfuge', function () {
    it('should handle awkward variable names', function () {
        fmt('#{} #{&} #{         }')({
            '': 'null',
            '&': 'and',
            '         ': 'void'
        }).should.equal('null and void')

        fmt('#{\t\t\t}#{\n}#{\n\n\n}')({
            '\n': '\n',
            '\n\n\n': 'Arimeka',
            '\t\t\t': 'Navi'
        }).should.equal('Navi\nArimeka')
    })

    it('should retain #{fmt} for undefined vars', function () {
        var t = fmt('#{2} #{X} #{4}')

        t({'2': '2', '4': '4'}).should.equal('2 #{X} 4')
        t({'9': '9', 'X': 'X'}).should.equal('#{2} X #{4}')
        t(function fgsfds() {}).should.equal('#{2} #{X} #{4}')
    })
})
