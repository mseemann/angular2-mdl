import { Component } from '@angular/core';
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
  styles:[
    `
    .demo-container {
        width: 100%;
        position: relative;
    }
    .demo-layout-transparent {
         background: url('assets/oslo.jpg') center / cover;
         height: 300px;
        
    }

    `
  ]
})
export class LayoutDemo {}
