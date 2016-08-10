import { Component } from '@angular/core';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'badge-demo',
  templateUrl: 'badge.component.html',
  directives: [
    PrismDirective
  ],
})
export class BadgeDemo {
  protected badgeCount = 1;
}
