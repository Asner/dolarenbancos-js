const logger = require('./logger');
const fetcher = require('./fetcher');

console.log('# IS PROD? ', process.env.NODE_ENV === 'production');
process.env.TZ = 'America/Hermosillo';

const sysRun = new Promise(function (resolve) {
  logger.info('=== Starting DOLLAR-BOT suite ===');
  logger.info('> Starting initial fetch');

  fetcher.fetchAll().then(() => {
    logger.info('> Initial fetch done');
    resolve();
  });
});

sysRun.then(() => {
  logger.info('> Starting services');
  require('./web');
  require('./discord');
  require('./scheduler');
  require('./telegram');
});
