import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'tabs-demo',
  templateUrl: 'tabs.component.html',
  directives: [
    PrismDirective
  ],
  styles: [
    `
    .demo-tab-container{
       display: inline-block;
    }
    mdl-icon {
       vertical-align: middle;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class TabsDemo {

  public activeIndex = 0;

  public tabChanged({index}) {
    this.activeIndex = index;
  }
}
