import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';

import { Angular2MdlAppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';


// beforeEach( async(() => {
//   TestBed.configureTestingModule({
//     providers: [Angular2MdlAppComponent, ...APP_ROUTER_PROVIDERS]
//   });
//   TestBed.compileComponents();
// }));


xdescribe('App: Angular2Mdl', () => {

  it('should create the app',
      inject([Angular2MdlAppComponent], (app: Angular2MdlAppComponent) => {

    expect(app).toBeTruthy();
  }));

  it('should have as title \'Angular 2 - Material Design Lite\'',
      inject([Angular2MdlAppComponent], (app: Angular2MdlAppComponent) => {
    expect(app.title).toEqual('Angular 2 - Material Design Lite');
  }));

});
