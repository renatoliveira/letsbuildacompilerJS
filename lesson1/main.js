/**
 * This is an adapted code from the 'Let’s Build A Simple Interpreter' series
 * by Ruslan Spivak. The original code was written in Python.
 * 
 * The original text can be found at https://ruslanspivak.com/lsbasi-part1/
 *
 * To run this program simply type "node main.js" in your console. You
 * should have NodeJS installed.
 */
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * Token types
 * 
 * EOF (end-of-file) token is used to indicate that
 * there is no more input left for lexical analysis
 */
const TOKEN = {
    INTEGER: 0,
    PLUS: 1,
    EOF: 2
}

class Token {
    constructor(type, val) {
        this.type = type
        this.value = val
    }

    toString () {
        return `Token (${this.type}, ${this.value})`
    }
}

class Interpreter {
    constructor(content) {
        this.text = content
        this.position = 0
        this.currentToken = undefined
    }

    error () {
        throw Error('Error parsing input')
    }

    /**
     * Lexical analyzer (aka scanner/tokenizer)
     * 
     * This method is responsible for breaking a sentence
     * apart into tokens. One token at a time.
     */
    getNextToken () {
        var text = this.text

        /**
         * Is the current position past the end of the text length?
         * If so, then return EOF token because there is no more
         * input left to convert into tokens.
         */
        if (this.position > text.length - 1) {
            return new Token(TOKEN.EOF, undefined)
        }

        /**
         * Get a character at the current position and decide
         * what token to create based on the single character. 
         */
        var currentCharacter = text[this.position]

        if (!isNaN(currentCharacter)) {
            this.advance()
            return new Token(TOKEN.INTEGER, currentCharacter)
        } else if (isNaN(currentCharacter)) {
            if (currentCharacter === '+') {
                this.advance()
                return new Token(TOKEN.PLUS, currentCharacter)
            }
        } else {
            console.log(typeof(currentCharacter))
        }
        this.error()
    }

    /**
     * Compare the current token type with the passed token
     * type and if they match then "eat" the current token
     * and assign the next token to the this.currentToken,
     * otherwise raise an exception.
     * 
     * @param {TOKEN} tokenType Token type to compare
     */
    eat (tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.getNextToken()
        } else {
            this.error();
        }
    }

    /**
     * expr -> INTEGER PLUS INTEGER
     */
    expr() {
        // set the current token to the first token taken from the input
        this.currentToken = this.getNextToken()

        // we expect the current token to be a single-digit integer
        var left = this.currentToken
        this.eat(TOKEN.INTEGER)

        // we expect the current token to be a '+' token
        var op = this.currentToken
        this.eat(TOKEN.PLUS)

        // we expect the current token to be a single-digit integer
        var right = this.currentToken
        this.eat(TOKEN.INTEGER)

        // after the above call the this.currentToken is set to EOF

        // at this point INTEGER PLUS INTEGER sequence of tokens
        // has been successfully found and the method can just
        // return the result of adding two integers, thus
        // effectively interpreting client input

        return this.getNumberValue(left.value) + this.getNumberValue(right.value)
    }

    /**
     * DRY?
     */
    advance () {
        this.position += 1
    }

    /**
     * Receives a number as string, then returns a float if it contains
     * a dot. Returns an int otherwise.
     * 
     * @param {String} v Number as string
     */
    getNumberValue (v) {
        if (v.indexOf('.') !== -1) {
            return parseFloat(v)
        }
        return parseInt(v)
    }
}

function main() {
    try {
        rl.question('Calulate: ', (res) => {
            if (res === 'q' || res === 'quit') {
                process.exit(0)
            }
            var interpreter = new Interpreter(res)
            result = interpreter.expr()
            console.log(result)
            main()
        })
    } catch (e) {
        console.error(e)
    }
}
main()
