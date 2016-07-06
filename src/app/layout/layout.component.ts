import { Component, ViewEncapsulation } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';
import { ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'layout-demo',
  templateUrl: 'layout.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective,
    ROUTER_DIRECTIVES
  ],
  styles: [
    `
    .demo-container {
        width: 100%;
        position: relative;
    }
    .demo-layout-transparent {
         background: url('assets/oslo.jpg') center / cover;
         height: 300px;
        color: white;
    }
    .demo-layout-fixed-drawer {
        height: 300px;
    }
    .demo-layout-fixed-header {
        height: 300px;
    }
    mdl-layout-content{
        margin:1rem;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class LayoutDemo {}

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
