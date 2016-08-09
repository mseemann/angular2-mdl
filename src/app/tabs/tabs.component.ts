import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'tabs-demo',
  templateUrl: 'tabs.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
  styles: [
    `
    .demo-tab-container{
       display: inline-block;
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
