const fs = require('fs');
const constants = require('./constants');


const dictionary = fs.readFileSync(constants.DICT_PATH).toString();
const affix = fs.readFileSync(constants.AFFIX_PATH).toString();


console.log(dictionary, '\n\n', affix);




const Spellchecker = require("hunspell-spellchecker")

const spellchecker = new Spellchecker();

const DICT = spellchecker.parse({
    dic:
`2
microsoft.com
gmail.com`,
    aff:
`SET UTF-8

REP 2
REP co com
REP com co`,
});

spellchecker.use(DICT);

const check = (word) => {
    if (!spellchecker.check(word)) {
        console.log(`${word} NOT OK, DID YOU MEAN [${spellchecker.suggest(word).join(', ')}]`);
    } else{
        console.log(`${word} OK`);
    }
}

check('gmail.com');
check('gmail.co');
