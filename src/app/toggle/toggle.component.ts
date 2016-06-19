import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismComponent } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'toggle-demo',
  templateUrl: 'toggle.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismComponent
  ],
})
export class ToggleDemo {
  checkbox1 = true;
  checkbox2 = false;
}
