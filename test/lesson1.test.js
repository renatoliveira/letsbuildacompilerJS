var intr = require('../lesson1/exercises')
var assert = require('assert')

describe('Plus operator.', () => {
    describe('Add two single-digit integers.', () => {
        it('Should add the two numbers.', () => {
            var i = intr.Interpreter('1+2')
            var r = i.expr()
            assert.equal(r, 3)
        }),
        it('Should add multiple-digit numbers.', () => {
            var i = intr.Interpreter('21+2')
            var r = i.expr()
            assert.equal(r, 23)

            i = intr.Interpreter('1234+1234')
            r = i.expr()
            assert.equal(r, 2468)

            i = intr.Interpreter('1+1234')
            r = i.expr()
            assert.equal(r, 1235)
        })
    })
})
