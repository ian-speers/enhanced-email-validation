const fs = require('fs');
const constants = require('./constants');


const dictionary = fs.readFileSync(constants.DICT_PATH).toString();
const affix = fs.readFileSync(constants.AFFIX_PATH).toString();


console.log(dictionary, '\n\n', affix);