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
      width: 500px;
      margin-right:1rem;
      float:left;
    }
    .demo-card-wide > .mdl-card__title {
      color: #fff;
      height: 176px;
      background: url('assets/sund.jpg') center / cover;
    }
    .demo-card-wide > .mdl-card__menu {
      color: #fff;
    }
    
    .demo-card-square.mdl-card {
      width: 320px;
      height: 320px;
      margin-right:1rem;
      float:left;
    }
    .demo-card-square > .mdl-card__title {
      color: #fff;
      background:
        url('assets/wood.jpg') bottom right 15% no-repeat #46B6AC;
    }

    .example-separator {
      clear: both;  
      margin-bottom: 1rem;
    }
    `
  ],
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
  encapsulation: ViewEncapsulation.None
})
export class CardDemo {

}
