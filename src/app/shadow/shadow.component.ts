import { Component, ViewEncapsulation } from '@angular/core';
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
    PrismDirective
  ],
  encapsulation: ViewEncapsulation.None
})
export class ShadowDemo {

}
