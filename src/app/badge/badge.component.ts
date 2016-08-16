import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'badge-demo',
  templateUrl: 'badge.component.html'
})
export class BadgeDemo {
  protected badgeCount = 1;
}
