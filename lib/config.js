var logger = require(__dirname + '/../lib/logger');
var configFile = __dirname + '/../config.json';

var config;

try {
  logger.info('config file found %s', configFile);
  config = require(configFile);
} catch (err) {
  logger.info('config file not found');
  config = {};
  config.telegram = {};
  config.bot = {};
  config.sonarr = {};
}

/*
 * set up config options, they can be passed in thru the enviroment
 */
config.telegram.botToken = config.telegram.botToken || process.env.TELEGRAM_BOTTOKEN;

config.bot.password = config.bot.password || process.env.BOT_PASSWORD || '';
config.bot.owner = config.bot.owner || process.env.BOT_OWNER || 0;
config.bot.maxResults = config.bot.maxResults || process.env.BOT_MAXRESULTS || 15;

config.sonarr.hostname = config.sonarr.hostname || process.env.SONARR_HOST || 'localhost';
config.sonarr.apiKey = config.sonarr.apiKey || process.env.SONARR_APIKEY;
config.sonarr.port = config.sonarr.port || process.env.SONARR_PORT || 8989;
config.sonarr.urlBase = config.sonarr.urlBase || process.env.SONARR_URLBASE;
config.sonarr.ssl = config.sonarr.ssl || process.env.SONARR_SSL || false;
config.sonarr.username = config.sonarr.username || process.env.SONARR_USERNAME;
config.sonarr.password = config.sonarr.password || process.env.SONARR_PASSWORD;

module.exports = config;