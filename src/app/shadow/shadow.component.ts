import { Component, ViewEncapsulation } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'shadow-demo',
  templateUrl: 'shadow.component.html',
  styles: [`
    .shadow-example {
      height: 70px;
      width: 100px;
      margin:20px;
      float: left;
    }
    .clearfix {
        clear: both;
    }
  `],
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
  encapsulation: ViewEncapsulation.None
})
export class ShadowDemo {

}
