import {
  Component,
  ViewContainerRef
} from '@angular/core';


@Component({
  selector: 'mdl-tab-panel-title',
  template:
    `
   <ng-content></ng-content>
   `
})
export class MdlTabPanelTitleComponent {

  constructor(public vcRef: ViewContainerRef) {}

}
