import {
  Component,
  Input
} from '@angular/core';


@Component({
  selector: 'mdl-tab-panel',
  host: {
    '[class.mdl-tabs__panel]': 'true',
    '[class.is-active]': 'isActive'
  },
  template:
    `
   <ng-content></ng-content>
   `
})
export class MdlTabPanelComponent {

  @Input('mdl-tab-panel-title') public title;
  public isActive = false;

}
