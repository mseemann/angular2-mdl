require('./css/style.scss');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Angular2MdlAppModule } from './app';

platformBrowserDynamic().bootstrapModule(Angular2MdlAppModule);
