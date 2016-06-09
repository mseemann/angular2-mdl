import { Component, ViewEncapsulation } from '@angular/core';
import {Route, Routes, ROUTER_DIRECTIVES} from '@angular/router';

import { ButtonDemo } from './button/button.component';

import { MDL_DIRECTIVES } from 'angular2-mdl';

@Component({
  selector: 'home',
  template: `
    <p>Welcome to the e2e demos for Angular 2 <a href="https://getmdl.io/" target="_blank">Material Design Lite!</a></p>
  `
})
export class Home {}


@Component({
  moduleId: module.id,
  selector: 'angular2-mdl-app',
  templateUrl: 'angular2-mdl.component.html',
  styleUrls: ['angular2-mdl.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MDL_DIRECTIVES
  ],
  encapsulation: ViewEncapsulation.None
})
@Routes([
  new Route({path: '/', component: Home}),
  new Route({path: '/button', component: ButtonDemo})
])
export class Angular2MdlAppComponent {
  title = 'Angular 2 - Material Design Lite';
}
