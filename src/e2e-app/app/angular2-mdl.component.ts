import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, UrlSegment, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { ButtonDemo } from './button/button.component';
import { BadgeDemo } from './badge/badge.component';
import { CardDemo } from './card/card.component';
import { ShadowDemo } from './shadow/shadow.component';

import { MDL_DIRECTIVES } from '../components';

@Component({
  selector: 'home',
  template: `
    <h4>Welcome to the e2e demos for Angular 2 <a href="https://getmdl.io/" target="_blank">Material Design Lite!</a></h4>
  `
})
export class Home {

  // urlSegments:Observable<UrlSegment[]>;
  //
  // constructor(private r:ActivatedRoute){
  //   console.log(r);
  //   this.urlSegments =  r.urlSegments;//.map( url => url[0].path);
  //   this.urlSegments.subscribe( (x) => {
  //     console.log(x);
  //   })
  // }
}

export const AppRoutes = [
  { component: Home, index: true },
  { path: '/badge', component: BadgeDemo },
  { path: '/button', component: ButtonDemo },
  { path: '/card', component: CardDemo },
  { path: '/shadow', component: ShadowDemo }
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

  // works only if ts 1.9 is used - but angualr cli has a peer dependency for 1.8 :(
  // constructor(private router:Router){
  //   router.events.subscribe( (event) => {
  //     console.log(event);
  //   });
  // }
}

