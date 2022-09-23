const fs = require('fs');
const Spellchecker = require("hunspell-spellchecker")

const constants = require('./constants');

const domainChecker = new Spellchecker();

domainChecker.use(domainChecker.parse({
  dic: fs.readFileSync(constants.DICT_PATH).toString(),
  aff: fs.readFileSync(constants.AFFIX_PATH).toString(),
}));

module.exports.check = (domain) => {
  if (domainChecker.check(domain)) {
    return { valid: true };
  }

  return {
    valid: false,
    suggestions: domainChecker.suggest(domain),
  }
}

