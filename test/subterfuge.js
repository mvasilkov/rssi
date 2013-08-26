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
})
