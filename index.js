const selenium = require('selenium-standalone');

module.exports = (gemini, opts) => {
  let server;

  gemini.on('startRunner', (runner) => {
    console.log('Starting Selenium ...');
    return new Promise((resolve, reject) => {
      selenium.start((err, child) => {
        console.log('Selenium started...');
        server = child;
        if (err) {
          console.error(err);
          return reject(err);
        }
        resolve();
      });
    });
  });

  gemini.on('endRunner', (runner, data) => {
    console.log('Selenium closed.');
    return server.kill();
  });
};
