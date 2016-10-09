import {
  Component,
  ViewChild,
  TemplateRef,
  Input
} from '@angular/core';
import { MdlDialogService, MdlDialogReference } from './mdl-dialog.service';
import { BooleanProperty } from './../common/boolean-property';


@Component({
  selector: 'mdl-dialog',
  template: `
    <div *dialogTemplate>
      <ng-content></ng-content>
    </div>
  `
})
export class MdlDialogComponent {

  @ViewChild(TemplateRef) private template: TemplateRef<any>;

  @Input('modal') @BooleanProperty() public modal = true;

  private dialogRef : MdlDialogReference;

  constructor(private dialogService: MdlDialogService) {}


  public show(): Promise<MdlDialogReference> {
    let p = this.dialogService.showDialogTemplate(this.template, {isModal: this.modal});
    p.then( (dialogRef: MdlDialogReference) => {
        this.dialogRef = dialogRef;
    })
    return p;
  }

  public close() {
    if (this.dialogRef){
      this.dialogRef.hide();
    }
  }
}
