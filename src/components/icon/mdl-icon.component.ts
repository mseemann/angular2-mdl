import {
  Component,
  NgModule,
  ViewEncapsulation,
  ModuleWithProviders
} from '@angular/core';


@Component({
  selector: 'mdl-icon',
  host: {
    '[class.material-icons]': 'true'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdlIconComponent {}


const MDL_ICON_DIRECTIVES = [MdlIconComponent];

@NgModule({
  imports: [],
  exports: MDL_ICON_DIRECTIVES,
  declarations: MDL_ICON_DIRECTIVES,
})
export class MdlIconModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlIconModule,
      providers: []
    };
  }
}
