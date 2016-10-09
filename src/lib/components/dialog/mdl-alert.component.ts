import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MdlDialogService } from './mdl-dialog.service';


@Component({
  selector: 'mdl-alert',
  host: {
    '[style.display]': '"none"'
  },
  template: `
  `,
  exportAs: 'mdlAlert'
})
export class MdlAlertComponent {

  @Input() public title: string;
  @Input() public message: string;
  @Input() public okText: string;


  @Output() public confirmed = new EventEmitter();

  constructor(private mdlDialogService: MdlDialogService) {
  }

  public show() {

    this.mdlDialogService.alert(this.message, this.okText, this.title).subscribe( () => {
      this.confirmed.emit();
    });

  }
}
