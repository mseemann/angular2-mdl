import { Component, ViewEncapsulation } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'card-demo',
  templateUrl: 'card.component.html',
  styles:[
    `
    .demo-card-wide {
      margin-right:1rem;
      float:left;
    }
    .demo-card-wide > .mdl-card__title {
      color: #fff;
      height: 176px;
      background: url('../assets/sund.jpg') center / cover;
    }
    .demo-card-wide > .mdl-card__menu {
      color: #fff;
    }`
  ],
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
  encapsulation: ViewEncapsulation.None
})
export class CardDemo {

}
