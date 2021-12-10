const { fs } = require('mz');
const nearley = require('nearley');
const grammar = require('./grammar.js')





async function main (code) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
    
    console.log(code);
	parser.feed(code)

    console.log(parser.results)
    const statements = parser.results[0]

    const functions =  (await fs.readFile('src/functions.js')).toString()
    const jsCode = generateJS(statements)  + '\n'+ functions

    return jsCode
  
}

function generateJS(statements) {
    console.log(statements);
    const lines = []
    for (const statement of statements) {
        const line=generateJSForEachStatementOrExpression(statement)
        lines.push(line)
    }
    return lines.join("\n")
}

function  generateJSForEachStatementOrExpression(line) {
    console.log("LINEA",line)
    if(line.type === "var_assign" || line.type === "var_reassign"){
        const varName = line.var_name.value
        let js = `${line.type === "var_assign" ? 'var' : ''} ${varName} = `
        const  varValue = line.value
        if(varValue.type === "function_call"){
           const value = generateJSForEachStatementOrExpression(varValue)
           return js + value;
        }
        else if(varValue.type === "arrow_function") {
            const value = generateJSForEachStatementOrExpression(varValue)
            return js + value;
        }
        else {
            return js + varValue.value
        }
   
    }
    else if(line.type === "function_call"){
        const funName = line.function_name.value
        
        const argumentsList = line.arguments.map((argument)=> {
            return generateJSForEachStatementOrExpression(argument)
        }).join(", ")
        const js = `${funName}(${argumentsList})`
        return js;
    }
    else if(line.type === "comparison_expression"){
        const js = `${line.left.value} ${line.operator.value } ${line.right.value }`
        return js;
    }
    else if(line.type === "string"){
        return varValue = line.value
    }
    else if(line.type === "number"){
        return varValue = line.value
        
    }
    else if(line.type === "identifier"){
        return varValue = line.value
        
    }
    else if(line.type === "NL"){
        return varValue = line.value
        
    }
    else if(line.type === "if_statement"){
        let ifConsequences = `\n`
        line.consequent[0].forEach((consequence) =>{
            ifConsequences += generateJSForEachStatementOrExpression(consequence) + "\n"
        })
        let elseConsequences = `\n`;
        if(line.alternate){
            line.alternate[0].forEach((consequence) =>{
                elseConsequences += generateJSForEachStatementOrExpression(consequence) + "\n"
            })
        }
        const leftValue = line.condition.left.value
        const rightValue = line.condition.right.value
        const operator = line.condition.operator.value
        const js = `if(${leftValue}${operator}${rightValue}){
            ${ifConsequences}
        }
            ${line.alternate && `
        else{
            ${elseConsequences}
        }
            `}
        `
        return js
    }
    else if(line.type === "while_statement"){
        let bodyStatements = `\n`
        line.body[0].forEach((statement) =>{
            bodyStatements += generateJSForEachStatementOrExpression(statement) + "\n"
        })
       
     
        const leftValue = line.condition.left.value
        const rightValue = line.condition.right.value
        const operator = line.condition.operator.value
        const js = `while(${leftValue}${operator}${rightValue}){
            ${bodyStatements}
        } `
        return js
    }
    else if(line.type === "do_while_statement"){
        let bodyStatements = `\n`
        line.body[0].forEach((statement) =>{
            bodyStatements += generateJSForEachStatementOrExpression(statement) + "\n"
        })
       
     
        const leftValue = line.condition.left.value
        const rightValue = line.condition.right.value
        const operator = line.condition.operator.value
        const js = `
        do{
            ${bodyStatements}

        }while(${leftValue}${operator}${rightValue})`
        return js
    }
    else if(line.type === "arrow_function"){
        let arrowFunctionStatements = `\n`
        line.body[0].forEach((bodyStatement) =>{
            arrowFunctionStatements += generateJSForEachStatementOrExpression(bodyStatement) + "\n"
        })

        let arrowFunctionParameters= ``
        line.parameters.forEach((param) =>{
            arrowFunctionParameters += param.value +", "
        })
        arrowFunctionStatements 
        const js = `(${arrowFunctionParameters}) =>{${arrowFunctionStatements + "\n"}}`   
        return js
    }
    else{
        throw new Error("Invalid statements")
    }
}
module.exports = main