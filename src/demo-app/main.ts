require('./css/style.scss');

// import 'core-js/es6';
// import 'core-js/es7/reflect';
// require('zone.js/dist/zone');
//
// if (process.env.ENV === 'production') {
//   // Production
// } else {
//   // Development
//   Error['stackTraceLimit'] = Infinity;
//   require('zone.js/dist/long-stack-trace-zone');
// }
//
// // Angular 2
// import '@angular/platform-browser';
// import '@angular/platform-browser-dynamic';
// import '@angular/core';
// import '@angular/common';
// import '@angular/http';
// import '@angular/router';
// // RxJS
// import 'rxjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Angular2MdlAppModule } from './app';

platformBrowserDynamic().bootstrapModule(Angular2MdlAppModule);
