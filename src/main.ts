import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Angular2MdlAppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import { disableDeprecatedForms, provideForms} from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

bootstrap(Angular2MdlAppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  APP_ROUTER_PROVIDERS
]).catch((err: any) => console.error(err));

