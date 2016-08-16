import { Component, ViewEncapsulation } from '@angular/core';

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
  encapsulation: ViewEncapsulation.None
})
export class ShadowDemo {

}
