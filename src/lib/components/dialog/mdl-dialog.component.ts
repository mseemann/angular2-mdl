import {
  Component
} from '@angular/core';


@Component({
  selector: 'mdl-dialog',
  host: {
    '[class.mdl-dialog]': 'true',
    '[class.open]': 'visible',
  },
  template: `<ng-content></ng-content>`
})
export class MdlDialogComponent {
  private visible: boolean = false;
  public show() {
    this.visible = true;
  }
  public close() {
    this.visible = false;
  }
}
