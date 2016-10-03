
const WATCH = process.argv.indexOf('--watch') > -1;

module.exports = function (config) {

  var testWebpackConfig = require('./webpack/webpack.test.js');


  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    browserNoActivityTimeout: 20000,
    customLaunchers: {
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      'config/test.spec.ts'
    ],
    preprocessors: {
      'config/test.spec.ts': ['webpack']
    },
    webpack: testWebpackConfig,
    // Webpack should show only errors on the console
    webpackMiddleware: { stats: 'errors-only'},
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: WATCH,
    browsers: ['Chrome'],
    singleRun: !WATCH
  });
};
