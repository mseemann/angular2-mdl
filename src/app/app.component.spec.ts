import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';

import { Angular2MdlAppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

beforeEachProviders(() => [Angular2MdlAppComponent, ...APP_ROUTER_PROVIDERS]);

describe('App: Angular2Mdl', () => {
  it('should create the app',
      inject([Angular2MdlAppComponent], (app: Angular2MdlAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'Angular 2 - Material Design Lite\'',
      inject([Angular2MdlAppComponent], (app: Angular2MdlAppComponent) => {
    expect(app.title).toEqual('Angular 2 - Material Design Lite');
  }));

});
