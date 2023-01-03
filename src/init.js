const fs = require('fs');
const readline = require('readline');



function appendEnvVariable(varName, varValue){
    fs.appendFile('./config/.env', `${varName}=${varValue}`, (err) =>{
        if(err) console.log(`[ERROR]: ${err}`);
    });
}

async function promptVarWrite(varName, defaultValue = "", isString = false){
    await new Promise((resolve) =>{
        const rl = readline.createInterface({input: process.stdin, output: process.stdout});
        rl.question(`Please enter value for ${varName}: `, (varValue) =>{
            if(varValue == ""){
                varValue = defaultValue;
            }

            if(isString){
                varValue = `"${varValue}"`;
            }
            appendEnvVariable(varName, varValue + '\n');
            rl.close();
            resolve();
        });
    });
    
}

(async function main(){
    if(!fs.existsSync('./config/.env')){
        await promptVarWrite('PORT', '8080');
        await promptVarWrite('DB_URI', '', true);
    }
})();



