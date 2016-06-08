import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync
} from '@angular/core/testing';
import {
  TestComponentBuilder
} from '@angular/compiler/testing';
import { Angular2MdlAppComponent } from './angular2-mdl.component';

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

  // it('should have a title in the div', inject([TestComponentBuilder], (tcb) => {
  //
  //   return tcb.createAsync(Angular2MdlAppComponent).then( (fixture)=>{
  //
  //     // run one "digest cycle" to show up the title
  //     fixture.detectChanges();
  //
  //     let nativeElement = fixture.nativeElement;
  //
  //     expect(nativeElement.innerText).toEqual('angular2-mdl works!');
  //
  //   })
  // }));
});
