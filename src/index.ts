const _ = require('lodash');

const domainChecker = require('./domainChecker');

type Rule = string | RegExp;

const DEFAULT_OPTIONS = {
  domains: {
    allow: [/\.edu(\.|$)/] as Rule[], // domain list is missing most .edu domains
    deny: [] as Rule[],
  },
};

const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const contextualizeDomainSuggestions = (
  account: string,
  domainSuggestions: string[],
) => domainSuggestions && domainSuggestions.map((s) => `${account}@${s}`);

const findMatchingDomainRule = (domain: string, rules: Rule[]) => rules.find((rule) => (
  (_.isString(rule) && _.isEqual(domain, rule)) ||
  (_.isRegExp(rule) && (rule as RegExp).test(domain))
));

type Result = {
  valid: boolean;
  suggestions?: string[];
};

/**
 * Checks that the provided string is a valid email address, and spell-checks the domain
 */
export default (address: string, options = DEFAULT_OPTIONS): Result => {
  const [account, domain, ...rest] = address.split('@');

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

  if (!regex.test(address)) {
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