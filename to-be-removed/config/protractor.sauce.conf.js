/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

var buildNumber = 'travis-build#'+process.env.TRAVIS_BUILD_NUMBER;

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  allScriptsTimeout: 11000,
  specs: [
    '../tmp/e2e/**/*.e2e.js'
  ],
  multiCapabilities: [
    {
      browserName: 'safari',
      platform: 'OS X 10.11',
      name: "safari-osx-tests",
      shardTestFiles: true,
      maxInstances: 5
    },
		{
			browserName: 'chrome',
			platform: 'Windows 8.1',
			version: '50.0',
			name: "win-chrome",
			shardTestFiles: true,
			maxInstances: 5
		},
		{
			browserName: 'chrome',
			platform: 'Windows 8.1',
			version: '51.0',
			name: "win-chrome",
			shardTestFiles: true,
			maxInstances: 5
		},
		{
			browserName: 'chrome',
			platform: 'Windows 10',
			version: '51.0',
			name: "win-10-chrome",
			shardTestFiles: true,
			maxInstances: 5
		},
    {
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: '50.0',
      name: "chrome-mac-tests",
      shardTestFiles: true,
      maxInstances: 5,
    },
    {
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: '51.0',
      name: "chrome-mac-tests",
      shardTestFiles: true,
      maxInstances: 5,
    },
    {
      browserName: 'firefox',
      version: '46.0',
      platform: 'OS X 10.11',
      name: "firefox-tests",
      shardTestFiles: true,
      maxInstances: 5
    },
    {
      browserName: 'firefox',
      version: '47.0',
      platform: 'OS X 10.11',
      name: "firefox-tests",
      shardTestFiles: true,
      maxInstances: 5
    },
    {
      browserName: 'firefox',
      platform: 'Windows 8.1',
      version: '47.0',
      name: "win-firefox",
      shardTestFiles: true,
      maxInstances: 5
    },
		{
			browserName: 'firefox',
			platform: 'Windows 10',
			version: '47.0',
			name: "win-10-firefox",
			shardTestFiles: true,
			maxInstances: 5
		},
    {
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11.0',
      name: 'IE WIN',
      shardTestFiles: true,
      maxInstances: 5
    },
    {
      browserName: 'android',
      platform: 'Linux',
      version: '5.1',
      deviceName: 'Android Emulator',
      deviceType: 'phone',
      name: 'Android phone',
      deviceOrientation: 'portrait',
      shardTestFiles: true,
      maxInstances: 5,
      exclude: ['../tmp/e2e/**/*.xandroid.e2e.js']
    },
    {
      browserName: 'android',
      platform: 'Linux',
      version: '4.4',
      deviceName: 'Android Emulator',
      deviceType: 'phone',
      name: 'Android phone',
      deviceOrientation: 'portrait',
      shardTestFiles: true,
      maxInstances: 5,
      exclude: ['../tmp/e2e/**/*.xandroid.e2e.js']
    },
    {
      browserName: 'android',
      platform: 'Linux',
      version: '5.1',
      deviceName: 'Android Emulator',
      deviceType: 'tablet',
      name: 'Android tablet',
      shardTestFiles: true,
      maxInstances: 5,
      exclude: ['../tmp/e2e/**/*.xandroid.e2e.js']
    },
    {
      browserName: 'android',
      platform: 'Linux',
      version: '5.0',
      deviceName: 'Android Emulator',
      deviceType: 'tablet',
      name: 'Android tablet',
      shardTestFiles: true,
      maxInstances: 5,
      exclude: ['../tmp/e2e/**/*.xandroid.e2e.js']
    },
    {
      browserName: 'Safari',
      appiumVersion: '1.5.3',
      deviceName: 'iPhone 6 Plus',
      deviceOrientation: 'portrait',
      name: 'iPhone 6 Plus - 9.2',
      platformVersion: '9.2',
      platformName: 'iOS'
    },
    {
      browserName: 'Safari',
      appiumVersion: '1.5.3',
      deviceName: 'iPhone 6 Plus',
      deviceOrientation: 'portrait',
      name: 'iPhone 6 Plus - 9.3',
      platformVersion: '9.3',
      platformName: 'iOS'
    },
    {
      browserName: 'Safari',
      appiumVersion: '1.5.3',
      deviceName: 'iPad Retina',
      deviceOrientation: 'portrait',
      name: 'iPad Retina - 9.2',
      platformVersion: '9.2',
      platformName: 'iOS'
    },
    {
      browserName: 'Safari',
      appiumVersion: '1.5.3',
      deviceName: 'iPad Retina',
      deviceOrientation: 'portrait',
      name: 'iPad Retina - 9.3',
      platformVersion: '9.3',
      platformName: 'iOS'
    },
    {
       browserName: 'MicrosoftEdge',
       platform: 'Windows 10',
       version: '13.10586',
       name: "win-edge",
     }
  ],
  sauceBuild: buildNumber,
  directConnect: false,
  baseUrl: 'http://mseemann.io/angular2-mdl/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
