/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/

/** Map relative paths to URLs. */
const map: any = {
  'angular2-mdl': 'components',
  'web-animations-js': 'vendor/web-animations-js'
};

/** User packages configuration. */
const packages: any = {
  'angular2-mdl': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  'web-animations-js': {main: 'web-animations.min.js'}
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/

const cliSystemConfigPackages: any = {};

cliSystemConfigPackages['@angular/core'] = { main: 'bundles/core.umd.js' };
cliSystemConfigPackages['@angular/forms'] = { main: 'bundles/forms.umd.js' };
cliSystemConfigPackages['@angular/common'] = { main: 'bundles/common.umd.js' };
cliSystemConfigPackages['@angular/compiler'] = { main: 'bundles/compiler.umd.js' };
cliSystemConfigPackages['@angular/http'] = { main: 'bundles/http.umd.js' };
cliSystemConfigPackages['@angular/router'] = { main: 'bundles/router.umd.js' };
cliSystemConfigPackages['@angular/platform-browser'] = { main: 'bundles/platform-browser.umd.js' };
cliSystemConfigPackages['@angular/platform-browser-dynamic'] = { main: 'bundles/platform-browser-dynamic.umd.js' };


cliSystemConfigPackages['rxjs'] = { main: 'index.js' };
cliSystemConfigPackages['app'] = { main: 'index.js' };


cliSystemConfigPackages['@angular/core/testing'] = { main: '../bundles/core-testing.umd.js' };
cliSystemConfigPackages['@angular/common/testing'] = { main: '../bundles/common-testing.umd.js' };
cliSystemConfigPackages['@angular/compiler/testing'] = { main: '../bundles/compiler-testing.umd.js' };
cliSystemConfigPackages['@angular/platform-browser/testing'] = { main: '../bundles/platform-browser-testing.umd.js' };
cliSystemConfigPackages['@angular/platform-browser-dynamic/testing'] = {
  main: '../bundles/platform-browser-dynamic-testing.umd.js' };
cliSystemConfigPackages['@angular/http/testing'] = { main: '../bundles/http-testing.umd.js' };
cliSystemConfigPackages['@angular/router/testing'] = { main: '../bundles/router-testing.umd.js' };
cliSystemConfigPackages['@angular/forms/testing'] = { main: '../bundles/forms-testing.umd.js' };


/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
