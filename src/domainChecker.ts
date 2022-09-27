const fs = require('fs');
const Spellchecker = require("hunspell-spellchecker")

const constants = require('./constants');

type ParsedConfig = any;

type Config = {
  dic: string;
  aff: string;
};

const domainChecker = (new Spellchecker() as {
  check: (s: string) => boolean;
  suggest: (s: string) => string[];
  use: ParsedConfig;
  parse: (o: Config) => ParsedConfig;
});

domainChecker.use(domainChecker.parse({
  dic: fs.readFileSync(constants.DICT_PATH).toString(),
  aff: fs.readFileSync(constants.AFFIX_PATH).toString(),
}));

export const check = (domain: string) => {
  if (domainChecker.check(domain)) {
    return { valid: true };
  }

  return {
    valid: false,
    suggestions: domainChecker.suggest(domain),
  }
}

