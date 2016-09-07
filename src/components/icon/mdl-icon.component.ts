import {
  Component,
  NgModule
} from '@angular/core';


@Component({
  selector: 'mdl-icon',
  host: {
    '[class.material-icons]': 'true'
  },
  template: '<ng-content></ng-content>'
})
export class MdlIconComponent {}


const MDL_ICON_DIRECTIVES = [MdlIconComponent];

@NgModule({
  imports: [],
  exports: MDL_ICON_DIRECTIVES,
  declarations: MDL_ICON_DIRECTIVES,
})
export class MdlIconModule {}
