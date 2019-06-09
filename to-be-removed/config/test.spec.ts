import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';
import 'rxjs';


import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';


TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

declare const require: any;
const testsContext: any = require.context('./../src/lib/components', true, /\.spec.ts/);
testsContext.keys().forEach(testsContext);
