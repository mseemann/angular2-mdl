import {
  Component,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter, ViewEncapsulation
} from '@angular/core';
import { MdlDialogService, MdlDialogReference } from './mdl-dialog.service';
import { BooleanProperty } from './../common/boolean-property';
import { Observable } from 'rxjs';
import { IMdlDialogConfiguration } from './mdl-dialog-configuration';



@Component({
  selector: 'mdl-dialog',
  template: `
    <div *dialogTemplate>
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class MdlDialogComponent {

  @ViewChild(TemplateRef) private template: TemplateRef<any>;

  // @deprecated use mdl-dialog-config instead (will be removed in 3.0.0)
  @Input('mdl-modal') @BooleanProperty() public modal;
  @Input('mdl-dialog-config') public config: IMdlDialogConfiguration;
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

    let mergedConfig: IMdlDialogConfiguration = this.config || {};

    // mdl-modal overwrites config.isModal if present
    mergedConfig.isModal = typeof this.modal !== 'undefined' ? this.modal : mergedConfig.isModal;
    // default is true
    if (typeof mergedConfig.isModal === 'undefined'){
      mergedConfig.isModal = true;
    }

    let p = this.dialogService.showDialogTemplate(this.template, mergedConfig);
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
