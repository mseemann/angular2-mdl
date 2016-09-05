import {
  TestBed,
  async
} from '@angular/core/testing';

import { Angular2MdlAppComponent } from './app.component';
import { Angular2MdlAppModule } from './app-module';
import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';

export class MockRouter {
  public events = new Subject();
  public routerState = { root: null };
  public createUrlTree() {}
}

describe('App: Angular2Mdl', () => {

  let compFixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Angular2MdlAppModule],
      providers: [
        { provide: Router, useValue: new MockRouter()},
        {provide: APP_BASE_HREF, useValue: '/'}
        ],
      declarations: []
    });

    TestBed.compileComponents().then( () => {
      compFixture = TestBed.createComponent(Angular2MdlAppComponent);
    });
  }));


  it('should create the app',  async(() => {
      expect(compFixture).toBeTruthy();
  }));

  it('should have as title \'Angular 2 - Material Design Lite\'',  async(() => {
    let app = compFixture.componentInstance;
    expect(app.title).toEqual('Angular 2 - Material Design Lite');
  }));


});


@Component({
  selector: 'test-app',
  template: '<root-app></root-app>'
})
class TestApp {}
