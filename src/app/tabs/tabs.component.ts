import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tabs-demo',
  templateUrl: 'tabs.component.html',
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
