import { Component } from '@angular/core';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'icon-demo',
  templateUrl: 'icon.component.html',
  directives: [
    PrismDirective
  ],
})
export class IconDemo {}
