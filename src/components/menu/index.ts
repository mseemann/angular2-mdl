import { NgModule } from '@angular/core';
import {
  MdlMenuComponent
} from './mdl-menu.component';
import {
  MdlMenuItemComponent
} from './mdl-menu-item.component';
import { MdlMenuItemFullBleedDeviderComponent } from './mdl-menu-item.directive';
import { CommonModule } from '@angular/common';


const MDL_MENU_DIRECTIVES = [
  MdlMenuComponent,
  MdlMenuItemComponent,
  MdlMenuItemFullBleedDeviderComponent
];

export * from './mdl-menu.component';
export * from './mdl-menu-item.component';
export * from './mdl-menu-item.directive';

@NgModule({
  imports: [CommonModule],
  exports: MDL_MENU_DIRECTIVES,
  declarations: MDL_MENU_DIRECTIVES,
})
export class MdlMenuModule {}
