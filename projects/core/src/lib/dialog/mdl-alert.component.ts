import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {MdlDialogService} from './mdl-dialog.service';


@Component({
  selector: 'mdl-alert',
  template: ``,
  exportAs: 'mdlAlert'
})
export class MdlAlertComponent {

  @Input() public title: string;
  @Input() public message: string;
  @Input() public okText: string;

  @HostBinding('style.display') display = 'none';

  @Output() public confirmed = new EventEmitter();

  constructor(private mdlDialogService: MdlDialogService) {
  }

  public show() {

    this.mdlDialogService.alert(this.message, this.okText, this.title).subscribe(() => {
      this.confirmed.emit();
    });

  }
}
