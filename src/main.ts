import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angular2MdlAppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';

import { PrismComponent } from './app/prism/prism.component';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2MdlAppComponent, [
  APP_ROUTER_PROVIDERS
]);

