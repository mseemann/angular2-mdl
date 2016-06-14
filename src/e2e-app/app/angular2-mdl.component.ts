import { Component, ViewEncapsulation } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import { ButtonDemo } from './button/button.component';
import { BadgeDemo } from './badge/badge.component';

import { MDL_DIRECTIVES } from '../components';

@Component({
  selector: 'home',
  template: `
    <h4>Welcome to the e2e demos for Angular 2 <a href="https://getmdl.io/" target="_blank">Material Design Lite!</a></h4>
  `
})
export class Home {}

export const AppRoutes = [
  { path: '/home',  component: Home, index: true },
  { path: '/badge', component: BadgeDemo },
  { path: '/button', component: ButtonDemo }
];

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
export class Angular2MdlAppComponent {
  title = 'Angular 2 - Material Design Lite';
}
