// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require('./lexer.js')
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "new_line"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_", "statements$ebnf$1", "statement", "_"], "postprocess": 
        (data)=>{
            return [data[2]]
        }
            },
    {"name": "statements$ebnf$2", "symbols": ["new_line"]},
    {"name": "statements$ebnf$2", "symbols": ["statements$ebnf$2", "new_line"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statements", "statements$ebnf$2", "_", "statement", "_"], "postprocess": 
        (data)=>{
            return [...data[0],data[3]]
        }
            },
    {"name": "statement", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id},
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["var_reassign"], "postprocess": id},
    {"name": "statement", "symbols": ["if_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["while_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["function_call"], "postprocess": id},
    {"name": "var_assign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expression", "_"], "postprocess":  
        (data)=>{
            return {
                type:"var_assign",
                var_name:data[0],
                value:data[4]
            }
        }
             },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("reassign") ? {type: "reassign"} : reassign), "_", "expression", "_"], "postprocess":  
        (data)=>{
            return {
                type:"var_reassign",
                var_name:data[0],
                value:data[4]
            }
        }
             },
    {"name": "function_call$ebnf$1", "symbols": ["arguments_list"], "postprocess": id},
    {"name": "function_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "function_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "function_call$ebnf$1", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  
        (data)=>{
            return {
                type:"function_call",
                function_name:data[0],
                arguments:data[4] ?  data[4] : [],
            }
        }
             },
    {"name": "arguments_list", "symbols": ["expression"], "postprocess":  
        (data)=>{
            return [data[0]];
        }
             },
    {"name": "arguments_list", "symbols": ["arguments_list", "_", (lexer.has("coma") ? {type: "coma"} : coma), "_", "expression"], "postprocess":  
        (data)=>{
            return [...data[0],data[4]];
        }
            },
    {"name": "parameters_list$ebnf$1", "symbols": []},
    {"name": "parameters_list$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("coma") ? {type: "coma"} : coma), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "parameters_list$ebnf$1", "symbols": ["parameters_list$ebnf$1", "parameters_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameters_list", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "parameters_list$ebnf$1"], "postprocess":  
        (data)=>{
            const restParams = data[1].map(piece => piece[3])
            return [data[0],...restParams];
        }
            },
    {"name": "arrow_function$ebnf$1$subexpression$1", "symbols": ["_", "parameters_list", "_"]},
    {"name": "arrow_function$ebnf$1", "symbols": ["arrow_function$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "arrow_function$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "arrow_function", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "arrow_function$ebnf$1", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", {"literal":":->"}, "_", "body_function"], "postprocess":  
            
        (data)=> {
            return {
                type:"arrow_function",
                parameters:data[1]? data[1][1] : [],
                body:data[6]
            }
        }
            },
    {"name": "body_function", "symbols": ["expression"], "postprocess": 
        (data)=> {
            return [[data[0]]]
        }
            },
    {"name": "body_function$ebnf$1", "symbols": ["new_line"]},
    {"name": "body_function$ebnf$1", "symbols": ["body_function$ebnf$1", "new_line"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "body_function$ebnf$2", "symbols": ["new_line"]},
    {"name": "body_function$ebnf$2", "symbols": ["body_function$ebnf$2", "new_line"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "body_function", "symbols": [(lexer.has("openBrace") ? {type: "openBrace"} : openBrace), "_", "body_function$ebnf$1", "statements", "body_function$ebnf$2", "_", (lexer.has("closeBrace") ? {type: "closeBrace"} : closeBrace)], "postprocess": 
        (data)=> {
            return [data[3]]
        }
            },
    {"name": "boolean", "symbols": [{"literal":"true"}], "postprocess": 
        data => ({
            type: "boolean",
            value: true,
            
        })
            },
    {"name": "boolean", "symbols": [{"literal":"false"}], "postprocess": 
        data => ({
            type: "boolean",
            value: false,
            
        })
            },
    {"name": "if_statement", "symbols": [{"literal":"ncIf"}, "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "comparison_expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "code_block"], "postprocess": 
        data => ({
            type: "if_statement",
            condition: data[4],
            consequent: data[8]
        })
                },
    {"name": "if_statement", "symbols": [{"literal":"ncIf"}, "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "comparison_expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "code_block", {"literal":"ncElse"}, "_", "code_block"], "postprocess": 
        data => ({
            type: "if_statement",
            condition: data[4],
            consequent: data[8],
            alternate: data[11]
        })
                },
    {"name": "while_statement", "symbols": [{"literal":"ncWhile"}, "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "comparison_expression", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "code_block"], "postprocess": 
        data => ({
            type: "while_statement",
            condition: data[4],
            body: data[8]
        })
                },
    {"name": "code_block", "symbols": ["body_function"], "postprocess": 
        id
            },
    {"name": "condition_expression", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "condition_expression", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "condition_expression", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "condition_expression", "symbols": ["boolean"], "postprocess": id},
    {"name": "comparison_operator", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "comparison_operator", "symbols": [{"literal":">="}], "postprocess": id},
    {"name": "comparison_operator", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "comparison_operator", "symbols": [{"literal":"<="}], "postprocess": id},
    {"name": "comparison_operator", "symbols": [{"literal":"=="}], "postprocess": id},
    {"name": "comparison_expression", "symbols": ["condition_expression"], "postprocess": 
        id
            },
    {"name": "comparison_expression", "symbols": ["condition_expression", "_", "comparison_operator", "_", "condition_expression"], "postprocess": 
        data => ({
            type: "comparison_expression",
            operator: data[2],
            left: data[0],
            right: data[4]
        })
                },
    {"name": "expression", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "expression", "symbols": ["arrow_function"], "postprocess": id},
    {"name": "expression", "symbols": ["boolean"], "postprocess": id},
    {"name": "expression", "symbols": ["comparison_expression"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "new_line", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
