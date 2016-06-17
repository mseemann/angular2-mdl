import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismComponent } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'loading-demo',
  templateUrl: 'loading.component.html',
  directives: [
    MDL_DIRECTIVES,
    PrismComponent
  ],
})
export class LoadingDemo {
  progress = 44;
  indeterminate = true;
  buffer = 78;
  active = true;
}
