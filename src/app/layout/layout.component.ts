import { Component, ViewEncapsulation } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'layout-demo',
  templateUrl: 'layout.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
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
        
    }
    .demo-layout-transparent .mdl-layout__header,
    .demo-layout-transparent .mdl-layout__drawer-button {
      /* This background is dark, so we set text to white. Use 87% black instead if
         your background is light. */
      color: white;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class LayoutDemo {}
