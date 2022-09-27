const https = require('https');
const fs = require('fs');
const os = require('os');

const constants = require('../dist/constants');

const knownDomainListRawURL = `https://gist.githubusercontent.com/ammarshah/f5c2624d767f91a7cbdc4e54db8dd0bf/raw/660fd949eba09c0b86574d9d3aa0f2137161fc7c/all_email_provider_domains.txt`;

const knownDomainListURL = new URL(knownDomainListRawURL);

const verifiedDomains = fs.readFileSync('resources/verified_domains.csv');

const options = {
  hostname: knownDomainListURL.hostname,
  port: knownDomainListURL.port,
  path: `${knownDomainListURL.pathname}?${knownDomainListURL.searchParams}`,
  method: 'GET',
};

https.request(options, (response) => {
  const data = [];

  response.on('data', data.push.bind(data));
  response.on('end', () => {
    const content = data.join('');
    const { length } = content.split(/\r\n|\r|\n/)
    console.log(length);
    fs.writeFile(constants.DICT_PATH, `${length}${os.EOL}${content}${os.EOL}${verifiedDomains}`, console.error);
  });
}).end();