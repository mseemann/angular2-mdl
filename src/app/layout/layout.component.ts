import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'layout-demo',
  templateUrl: 'layout.component.html',
  styles: [
    `
    .demo-container {
        width: 100%;
        position: relative;
        height: 300px;
    }
    .demo-layout-transparent {
        background: url('assets/oslo.jpg') center / cover;
        color: white;
    }
    .page-content {
        height: 600px;
    }
    
    mdl-icon {
       vertical-align: middle;
    }
    .mdl-layout__tab {
        cursor: pointer;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class LayoutDemo {

  public activeIndex = 0;

  public tabChanged({index}) {
    this.activeIndex = index;
  }
}

@Component({
  moduleId: module.id,
  selector: 'layout-demo-0',
  template: '',
})
export class Layout0Demo {}

@Component({
  moduleId: module.id,
  selector: 'layout-demo-1',
  template: '<div>Link 1 content</div>',
})
export class Layout1Demo {}

@Component({
  moduleId: module.id,
  selector: 'layout-demo-2',
  template: '<div>Link 2 content</div>',
})
export class Layout2Demo {}

@Component({
  moduleId: module.id,
  selector: 'layout-demo-3',
  template: '<div>Link 3 content</div>',
})
export class Layout3Demo {}
