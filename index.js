const domainChecker = require('./domainChecker');

const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const contextualizeDomainSuggestions = (account, suggestions) => suggestions && suggestions.map((s) => `${account}@${s}`);

module.exports = (email) => {
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

  const domainCheckResult = domainChecker.check(domain);

  return {
    ...domainCheckResult,
    suggestions: contextualizeDomainSuggestions(account, domainCheckResult.suggestions),
  };
};