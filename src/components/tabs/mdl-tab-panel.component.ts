import {
  Component,
  Input,
  ContentChild
} from '@angular/core';
import { MdlTabPanelTitleComponent } from './mdl-tab-panel-title.component';

@Component({
  selector: 'mdl-tab-panel-content',
  template: '<ng-content></ng-content>'
})
export class MdlTabPanelContent {

}

@Component({
  selector: 'mdl-tab-panel',
  host: {
    '[class.mdl-tabs__panel]': 'true',
    '[class.is-active]': 'isActive'
  },
  template:
    `
   <ng-content *ngIf="titleComponent" select="mdl-tab-panel-content"></ng-content>
   <ng-content *ngIf="!titleComponent"></ng-content>
   `
})
export class MdlTabPanelComponent {

  @ContentChild(MdlTabPanelTitleComponent) public titleComponent;
  @Input('mdl-tab-panel-title') public title;
  public isActive = false;

}
