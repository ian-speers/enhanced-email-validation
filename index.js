const domainChecker = require('./domainChecker');


module.exports = (email) => {
  const [account, domain] = email.split('@');

  domainChecker.check(domain);
};