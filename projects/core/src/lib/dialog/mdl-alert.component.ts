import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {MdlDialogService} from './mdl-dialog.service';


@Component({
  selector: 'mdl-alert',
  template: ``,
  exportAs: 'mdlAlert'
})
export class MdlAlertComponent {

  @Input()
  title: string;

  @Input()
  message: string;

  @Input()
  okText: string;

  @HostBinding('style.display')
  display = 'none';

  @Output()
  confirmed = new EventEmitter();

  constructor(private mdlDialogService: MdlDialogService) {
  }

  show(): void {
    this.mdlDialogService.alert(this.message, this.okText, this.title).subscribe(() => {
      this.confirmed.emit();
    });
  }
}
