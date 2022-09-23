const fs = require('fs');
const Spellchecker = require("hunspell-spellchecker")

const constants = require('./constants');

const spellchecker = new Spellchecker();

const DICT = spellchecker.parse({
  dic: fs.readFileSync(constants.DICT_PATH).toString(),
  aff: fs.readFileSync(constants.AFFIX_PATH).toString(),
});

spellchecker.use(DICT);

module.exports.check = (word) => {
  if (!spellchecker.check(word)) {
    console.log(`${word} NOT OK, DID YOU MEAN [${spellchecker.suggest(word).join(', ')}]`);
  } else{
    console.log(`${word} OK`);
  }
}

