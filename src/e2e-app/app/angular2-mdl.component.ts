import { Component, ViewEncapsulation } from '@angular/core';
import { MdlButtonDirective} from 'angular2-mdl';

@Component({
  moduleId: module.id,
  selector: 'angular2-mdl-app',
  templateUrl: 'angular2-mdl.component.html',
  styleUrls: ['angular2-mdl.component.css'],
  directives: [MdlButtonDirective],
  encapsulation: ViewEncapsulation.None
})
export class Angular2MdlAppComponent {
  title = 'angular2-mdl works!';
}
