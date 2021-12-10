var xd = 2
var no = () =>{
ncOut("xddd")

}
no()
ncOut(xd)
function ncOut(...args) {
    console.log(...args);
}

function sum(...numbers) {
    if(numbers.length < 2) throw new Error("sum function expected at least 2 numbers");
    let result = 0;
    for (const number of numbers) {
        result += number
    }
    return result;
}



function subtract(...numbers) {
    if(numbers.length < 2) throw new Error("subtract function expected at least 2 numbers");
    let result = 0;
    for (const number of numbers) {
        result -= number
    }
    return result;
}


function multiply(...numbers) {
    if(numbers.length < 2) throw new Error("multiply function expected at least 2 numbers");
    let result = 1;
    for (const number of numbers) {
        result *= number
    }
    return result;
}


function divide(...numbers) {
    if(numbers.length < 2) throw new Error("divide function expected at least 2 numbers");
    
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result /= numbers[i]
    }
    return result;
}