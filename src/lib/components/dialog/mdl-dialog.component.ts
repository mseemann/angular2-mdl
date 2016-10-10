import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MdlDialogService, MdlDialogReference } from './mdl-dialog.service';
import { BooleanProperty } from './../common/boolean-property';
import { Observable } from 'rxjs';



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

  @Input('mdl-modal') @BooleanProperty() public modal = true;
  @Output('show') public showEmitter: EventEmitter<MdlDialogReference> = new EventEmitter<MdlDialogReference>();
  @Output('hide') public hideEmitter: EventEmitter<void> = new EventEmitter<void>();

  private isShown = false;
  private dialogRef : MdlDialogReference = null;

  constructor(private dialogService: MdlDialogService) {}


  public show(): Observable<MdlDialogReference> {

    if(this.isShown){
      throw new Error('Only one instance of an embedded mdl-dialog can exist!');
    }
    this.isShown = true;

    let p = this.dialogService.showDialogTemplate(this.template, {isModal: this.modal});
    p.subscribe( (dialogRef: MdlDialogReference) => {

      this.dialogRef = dialogRef;
      this.showEmitter.emit(dialogRef);

      this.dialogRef.onHide().subscribe( () => {
        this.hideEmitter.emit(null);
        this.dialogRef = null;
        this.isShown = false;
      });

    })
    return p;
  }

  public close() {
    if (this.dialogRef){
      this.dialogRef.hide();
    }
  }
}
