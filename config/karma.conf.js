module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-spec-reporter')
    ],
    customLaunchers: {
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      {pattern: 'dist/vendor/core-js/client/core.js', included: true, watched: false},
      {pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false},
      {pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false},
      'dist/vendor/zone.js/dist/zone.js',
      'dist/vendor/zone.js/dist/long-stack-trace-zone.js',
      'dist/vendor/zone.js/dist/async-test.js',
      'dist/vendor/zone.js/dist/fake-async-test.js',
      'dist/vendor/zone.js/dist/sync-test.js',
      'dist/vendor/zone.js/dist/proxy.js',
      'dist/vendor/zone.js/dist/jasmine-patch.js',

      { pattern: 'config/karma-test-shim.js', included: true, watched: true },

      // Distribution folder.
      { pattern: 'dist/**/*', included: false, watched: true }
    ],
    exclude: [
      // Vendor packages might include spec files. We don't want to use those.
      'dist/vendor/**/*.spec.js'
    ],
    preprocessors: {
      'dist/components/**/!(*spec|*vendor).js': ['coverage']
    },
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
        { type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
        }
      ]
    },
    reporters: ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
