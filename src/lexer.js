const moo = require('moo')

let lexer = moo.compile({
	WS: /[ \t]+/,
	comment: /\/\/.*?$/,
	number: /0|[1-9][0-9]*/,
	string: /"(?:\\["\\]|[^\n"\\])*"/,
	lparen: '(',
	rparen: ')',
	openBrace:'{',
	closeBrace:'}',
	assign: '<-',
	greaterOrEqualThan:'>=',
	smallerOrEqualThan: '<=',
	greaterThan:'>',
	smallerThan: '<',
	identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
	ncIf:'ncIf',
	ncFor:'ncFor',
	ncWhile:'ncWhile',
	ncDo:'ncDo',
	reassign:'-:',
	coma:',',
	arrowSymbol:':->',
	NL: { match: /\n/, lineBreaks: true },
})


module.exports = lexer;
