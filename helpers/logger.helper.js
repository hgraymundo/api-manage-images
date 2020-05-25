const log4js = require('log4js');
log4js.configure({
  appenders: { images: { type: 'file', filename: './logs/images.log' } },
  categories: { default: { appenders: ['images'], level: 'error' } }
});
 
const LOG = log4js.getLogger('api-images');
LOG.level = process.env.LOG_LEVEL || 'all';

module.exports = LOG;