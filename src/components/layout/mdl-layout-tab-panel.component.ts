import {
  Component,
  Input
} from '@angular/core';


@Component({
  selector: 'mdl-layout-tab-panel',
  host: {
    '[class.mdl-layout__tab-panel]': 'true',
    '[class.is-active]': 'isActive'
  },
  template:
    `
   <ng-content></ng-content>
   `
})
export class MdlLayoutTabPanelComponent {

  @Input('mdl-layout-tab-panel-title') public title;
  public isActive = false;

}
