import {
  Component
} from '@angular/core';


@Component({
  selector: 'mdl-dialog',
  host: {
    '[style.display]': '"none"'
  },
  template: `<ng-content></ng-content>`
})
export class MdlDialogComponent {

  public show() {

  }
  public close() {

  }
}
