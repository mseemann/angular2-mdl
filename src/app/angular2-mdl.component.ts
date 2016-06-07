import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'angular2-mdl-app',
  templateUrl: 'angular2-mdl.component.html',
  styleUrls: ['angular2-mdl.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2MdlAppComponent {
  title = 'angular2-mdl works!';
}
