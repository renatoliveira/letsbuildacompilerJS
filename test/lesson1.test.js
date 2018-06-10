// import { Interpreter } from "../lesson1/main";
// import * as assert from "assert"

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
            var i = intr.Interpreter('10+2')
            var r = i.expr()
            assert.equal(r, 12)
        })
    })
})
