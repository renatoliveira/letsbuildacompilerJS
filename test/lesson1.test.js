var intr = require('../lesson1/exercises')
var assert = require('assert')

describe('Plus operator', () => {
    describe('Add two integers', () => {
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
        }),
        it('Should skip whitespace.', () => {
            var i = intr.Interpreter(' 12 + 34 ')
            var r = i.expr()
            assert.equal(r, 46)
        })
    })
})

describe('Minus operator', () => {
    describe('Subtract two numbers', () => {
        it('Should subtract two integers.', () => {
            var i = intr.Interpreter('5-1')
            var r = i.expr()
            assert.equal(r, 4)
        }),
        it('Should subtract two integers, ignoring whitespace.', () => {
            var i = intr.Interpreter(' 5 - 1')
            var r = i.expr()
            assert.equal(r, 4)
        }),
        it('Should subtract two integers with multiple digits, ignoring whitespace.', () => {
            var i = intr.Interpreter(' 15 - 10')
            var r = i.expr()
            assert.equal(r, 5)
        })
    })
})