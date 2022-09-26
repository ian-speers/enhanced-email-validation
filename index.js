const _ = require('lodash');

const domainChecker = require('./domainChecker');

const DEFAULT_OPTIONS = {
  domains: {
    allow: [/\.edu(\.|$)/], // domain list is missing most .edu domains
    deny: [],
  },
};

const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const contextualizeDomainSuggestions = (account, suggestions) => suggestions && suggestions.map((s) => `${account}@${s}`);

const findMatchingDomainRule = (domain, rules) => rules.find((rule) => (
  (_.isString(rule) && _.isEqual(domain, rule)) ||
  (_.isRegExp(rule) && rule.test(domain))
));

module.exports = (email, options = DEFAULT_OPTIONS) => {
  const [account, domain, ...rest] = email.split('@');

  if (rest && rest.length) {
    return { valid: false };
  }

  if (!account || account.length > 64) {
    return { valid: false };
  }

  if (!domain || domain.length > 255) {
    return { valid: false };
  }

  if (domain.split('.').some((part) => part.length > 63)) {
    return { valid: false };
  }

  if (!regex.test(email)) {
    return { valid: false };
  }

  const allowDomains = options?.domains?.allow ?? DEFAULT_OPTIONS.domains.allow;

  if (findMatchingDomainRule(domain, allowDomains)) {
    return { valid: true };
  }

  const deniedDomains = options?.domains?.deny ?? DEFAULT_OPTIONS.domains.deny;

  if (findMatchingDomainRule(domain, deniedDomains)) {
    return { valid: false };
  }

  const domainCheckResult = domainChecker.check(domain);

  return {
    ...domainCheckResult,
    suggestions: contextualizeDomainSuggestions(account, domainCheckResult.suggestions),
  };
};