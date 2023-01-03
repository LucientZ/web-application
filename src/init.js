const fs = require('fs');
const readline = require('readline');

function appendEnvVariable(varName, varValue){
    // Appends a variable to the end of the .env file. Error callback just prints the error.
    fs.appendFile('./config/.env', `${varName}=${varValue}`, (err) =>{
        if(err) console.log(`[ERROR]: ${err}`);
    });
}

async function promptVarWrite(varName, defaultValue = "", isString = false){
    // Promise forces code to be blocked so that multiple readline interfaces don't collide
    await new Promise((resolve) =>{
        const rl = readline.createInterface({input: process.stdin, output: process.stdout}); // rl object can be used for command prompt user input
        rl.question(`Please enter value for ${varName} (default: ${defaultValue}): `, (varValue) =>{

            // If the value inputted is an empty string, assume this means that the default value will be taken
            if(varValue == ""){
                varValue = defaultValue;
            }

            // If the value of the environment variable is a string, add quotes to variable being written to .env
            if(isString){
                varValue = `"${varValue}"`;
            }

            appendEnvVariable(varName, varValue + '\n');
            rl.close();
            resolve();
        });
    });
    
}

// Main is declared and immediately executed.
(async function main(){
    // Only prompts for environment variables when ./config/.env doesn't exist
    if(!fs.existsSync('./config/.env')){
        await promptVarWrite('PORT', '8080');
        await promptVarWrite('DB_URI', 'none', true);
    }
})();
