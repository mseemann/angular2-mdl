import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';

import {Angular2MdlAppComponent} from './app.component';
import {Angular2MdlAppModule} from './app-module';
import {APP_BASE_HREF} from '@angular/common';
import {Component} from '@angular/core';

describe('App: Angular2Mdl', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Angular2MdlAppModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
        ],
      declarations: [TestApp]
    });
  }));


  xit('should create the app',  ( done ) => {

    TestBed.compileComponents().then( () => {


      let compFixture = TestBed.createComponent(Angular2MdlAppComponent);

      console.log(compFixture.nativeElement);

      expect(compFixture).toBeTruthy();

      done();
    });

  });

  xit('should have as title \'Angular 2 - Material Design Lite\'',
      inject([Angular2MdlAppComponent], (app: Angular2MdlAppComponent) => {
    expect(app.title).toEqual('Angular 2 - Material Design Lite');
  }));

});


@Component({
  selector: 'test-app',
  template: '<root-app></root-app>'
})
class TestApp {}
