require('./css/style.scss');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angular2MdlAppModule } from './app';


platformBrowserDynamic().bootstrapModule(Angular2MdlAppModule);
