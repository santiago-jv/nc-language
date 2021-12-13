const express = require('express');
const cors = require('cors');
const main = require('./parse');
const { fs } = require('mz');
const { exec } = require('mz/child_process');

const app = express();
app.use(cors())
app.use(express.json());

app.post('/',async (request, response)=>{
    const code = request.body.code

    try {
        const jsCode = await main(code)
        fs.writeFileSync("src/code.js",jsCode);
        
        exec("node src/code.js", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                response.status(400).json({
                    result:stderr,
                    code
                })
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`${stdout}`);
           
            response.status(200).json({
                result:stdout,
                code
            })
        });
    } catch (error) {
        console.log(error);
        return response.status(400).json({
            result:error.message,
            code
        })
    }
})

app.listen(process.env.PORT || 4000, function(){
    console.log("listening")
})