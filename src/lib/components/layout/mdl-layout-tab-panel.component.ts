import {
  Component,
  Input,
  ContentChild,
  ViewEncapsulation
} from '@angular/core';
import { MdlTabPanelTitleComponent } from '../tabs/index';


@Component({
  selector: 'mdl-layout-tab-panel',
  host: {
    '[class.mdl-layout__tab-panel]': 'true',
    '[class.is-active]': 'isActive'
  },
  template:
    `
   <ng-content *ngIf="titleComponent" select="mdl-tab-panel-content"></ng-content>
   <ng-content *ngIf="!titleComponent"></ng-content>
   `,
  encapsulation: ViewEncapsulation.None
})
export class MdlLayoutTabPanelComponent {

  @ContentChild(MdlTabPanelTitleComponent) public titleComponent;
  @Input('mdl-layout-tab-panel-title') public title;
  public isActive = false;

}
