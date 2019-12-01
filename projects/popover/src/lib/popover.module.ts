import {ModuleWithProviders, NgModule} from '@angular/core';
import {MdlPopoverComponent, MdlPopoverRegistry, PopupPositionService} from './popover.component';


@NgModule({
  imports: [],
  exports: [MdlPopoverComponent],
  declarations: [MdlPopoverComponent],
  providers: [MdlPopoverRegistry, PopupPositionService],
})
export class MdlPopoverModule {
  static forRoot(): ModuleWithProviders<MdlPopoverModule> {
    return {
      ngModule: MdlPopoverModule,
      providers: []
    };
  }
}
