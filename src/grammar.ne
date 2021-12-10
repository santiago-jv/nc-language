@{%
const lexer = require('./lexer.js')
%}

@lexer lexer

statements ->
    _  new_line:* statement _

    {%
        (data)=>{
            return [data[2]]
        }
    %}
    | statements new_line:+ _ statement _
     {%
        (data)=>{
            return [...data[0],data[3]]
        }
    %}

statement
    -> %NL {% id %}
    | var_assign {% id %}
    | var_reassign {% id %}
    | if_statement {% id %}
    | while_statement {% id %}
    | function_call {% id %}


var_assign
    -> %identifier _ %assign _ expression _
    {% 
        (data)=>{
            return {
                type:"var_assign",
                var_name:data[0],
                value:data[4]
            }
        }
     %}

var_reassign
    -> %identifier _ %reassign _ expression _
    {% 
        (data)=>{
            return {
                type:"var_reassign",
                var_name:data[0],
                value:data[4]
            }
        }
     %}


function_call ->
    %identifier _ %lparen _ arguments_list:? _ %rparen 
    {% 
        (data)=>{
            return {
                type:"function_call",
                function_name:data[0],
                arguments:data[4] ?  data[4] : [],
            }
        }
     %} 


arguments_list ->
    expression
    {% 
        (data)=>{
            return [data[0]];
        }
     %}    
    | arguments_list _ %coma _ expression

    {% 
        (data)=>{
            return [...data[0],data[4]];
        }
    %} 



parameters_list ->
     
    %identifier (_ %coma _ %identifier):*

    {% 
        (data)=>{
            const restParams = data[1].map(piece => piece[3])
            return [data[0],...restParams];
        }
    %} 


arrow_function ->
    %lparen (_ parameters_list _):? %rparen _ ":->"  _ body_function  
    {% 
    
        (data)=> {
            return {
                type:"arrow_function",
                parameters:data[1]? data[1][1] : [],
                body:data[6]
            }
        }
    %}

body_function ->
    expression
    {%
        (data)=> {
            return [[data[0]]]
        }
    %}
    | %openBrace _ new_line:+ statements new_line:+ _ %closeBrace
    {%
        (data)=> {
            return [data[3]]
        }
    %}


boolean ->
    "true" 
    {%
        data => ({
            type: "boolean",
            value: true,
            
        })
    %}
    | "false"
    {%
        data => ({
            type: "boolean",
            value: false,
            
        })
    %}


if_statement
    -> "ncIf" _ %lparen _ comparison_expression _ %rparen _ code_block
        {%
            data => ({
                type: "if_statement",
                condition: data[4],
                consequent: data[8]
            })
        %}
        
    |  "ncIf" _ %lparen _ comparison_expression _ %rparen _ code_block
       "ncElse" _ code_block
        {%
            data => ({
                type: "if_statement",
                condition: data[4],
                consequent: data[8],
                alternate: data[11]
            })
        %}

while_statement
    -> "ncWhile" _ %lparen _ comparison_expression _ %rparen _ code_block
        {%
            data => ({
                type: "while_statement",
                condition: data[4],
                body: data[8]
            })
        %}

            
code_block -> body_function
    {%
        id
    %}






condition_expression ->
    %string {% id %}
    |  %number  {% id %}
    | %identifier {% id %}
    | boolean {% id %}


comparison_operator
    -> ">"   {% id %}
    |  ">="  {% id %}
    |  "<"   {% id %}
    |  "<="  {% id %}
    |  "=="  {% id %}

comparison_expression
    -> condition_expression 

    {%
        id
    %}
    |condition_expression  _ comparison_operator _ condition_expression
        {%
            data => ({
                type: "comparison_expression",
                operator: data[2],
                left: data[0],
                right: data[4]
            })
        %}



expression
    -> %string {% id %}
    |  %number  {% id %}
    | %identifier {% id %}
    | function_call {% id %}
    | arrow_function {% id %}
    | boolean {% id %}
    | comparison_expression {% id %}

_  -> %WS:* 

__ -> %WS:+ 


new_line -> %NL