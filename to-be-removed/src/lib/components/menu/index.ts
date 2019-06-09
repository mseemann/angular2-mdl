import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  MdlMenuComponent, MdlMenuRegisty
} from './mdl-menu.component';
import {
  MdlMenuItemComponent
} from './mdl-menu-item.component';
import { MdlMenuItemFullBleedDeviderComponent } from './mdl-menu-item.directive';
import { CommonModule } from '@angular/common';
import { MdlToggleMenuDirective } from './mdl-toggle-menu.directive';


const MDL_MENU_DIRECTIVES = [
  MdlMenuComponent,
  MdlMenuItemComponent,
  MdlMenuItemFullBleedDeviderComponent,
  MdlToggleMenuDirective
];

export * from './mdl-menu.component';
export * from './mdl-menu-item.component';
export * from './mdl-menu-item.directive';

@NgModule({
  imports: [CommonModule],
  exports: MDL_MENU_DIRECTIVES,
  declarations: MDL_MENU_DIRECTIVES,
})
export class MdlMenuModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdlMenuModule,
      providers: [MdlMenuRegisty]
    };
  }
}
