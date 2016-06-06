import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2MdlAppComponent } from '../app/angular2-mdl.component';

beforeEachProviders(() => [Angular2MdlAppComponent]);

describe('App: Angular2Mdl', () => {
  it('should create the app',
      inject([Angular2MdlAppComponent], (app: Angular2MdlAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2-mdl works!\'',
      inject([Angular2MdlAppComponent], (app: Angular2MdlAppComponent) => {
    expect(app.title).toEqual('angular2-mdl works!');
  }));
});
