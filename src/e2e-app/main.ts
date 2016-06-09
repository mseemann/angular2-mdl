import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router';
import { Angular2MdlAppComponent, environment } from 'app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2MdlAppComponent, [ROUTER_PROVIDERS]);

