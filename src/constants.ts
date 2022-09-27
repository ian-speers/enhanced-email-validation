const path = require('path');

const root = __dirname.replace(/\/dist\/?$/, '');

module.exports = {
  DICT_PATH: path.resolve(root, 'resources/domains.dic') as string,
  AFFIX_PATH: path.resolve(root, 'resources/domains.aff') as string,
};