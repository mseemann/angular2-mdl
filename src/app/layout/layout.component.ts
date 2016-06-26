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
})
export class LayoutDemo {}
