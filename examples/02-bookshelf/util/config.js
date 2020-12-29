const _ = require('lodash');
const fs = require('fs');

[
  `${__dirname}/../config/config.all.json`,
  `${__dirname}/../config/config.${env}.json`,
  `${__dirname}/../config/config.${env}.secret.json`,
].

return _.reduce(settingsPaths, (settings, path) => {
  if (fs.existsSync(path)) return _.merge(settings, JSON.parse(fs.readFileSync(path, 'UTF-8')));
  return settings;
}, {});


module.exports = function loadSettings(env = 'test') {
  const settingsPaths = ;
};
