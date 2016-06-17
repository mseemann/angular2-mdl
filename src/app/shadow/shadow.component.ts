import { Component, ViewEncapsulation } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismComponent } from './../prism/prism.component';

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
  `],
  directives: [
    MDL_DIRECTIVES,
    PrismComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class ShadowDemo {

}
