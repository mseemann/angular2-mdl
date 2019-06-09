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
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    files: [
      'config/test.spec.ts'
    ],
    preprocessors: {
      'config/test.spec.ts': ['webpack']
		},

		remapIstanbulReporter: {
			reports: {
				html: 'coverage/remaped-html',
				lcovonly: 'coverage/lcov.info',
				'text-summary': null
			}
		},
    webpack: testWebpackConfig,
    // Webpack should show only errors on the console
    webpackMiddleware: { stats: 'errors-only'},
    reporters: (WATCH ? ['progress'] : ['spec', 'karma-remap-istanbul']),
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: WATCH,
    browsers: ['Chrome'],
    singleRun: !WATCH
  });
};
