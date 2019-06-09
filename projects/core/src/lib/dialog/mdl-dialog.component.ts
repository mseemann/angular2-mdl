import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {MdlDialogReference, MdlDialogService} from './mdl-dialog.service';
import {toBoolean} from '../common/boolean-property';
import {IMdlDialogConfiguration} from './mdl-dialog-configuration';


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

  @ViewChild(TemplateRef, {static: true}) public template: TemplateRef<any>;
  @Input('mdl-dialog-config') public config: IMdlDialogConfiguration;
  @Output('show') public showEmitter: EventEmitter<MdlDialogReference> = new EventEmitter<MdlDialogReference>();
  @Output('hide') public hideEmitter: EventEmitter<void> = new EventEmitter<void>();
  private isShown = false;
  private dialogRef: MdlDialogReference = null;

  constructor(private dialogService: MdlDialogService) {
  }

  // @deprecated use mdl-dialog-config instead (will be removed in 3.0.0)
  private _modal: boolean;

  @Input('mdl-modal')
  get modal(): boolean {
    return this._modal;
  }

  set modal(value) {
    this._modal = toBoolean(value);
  }

  public show(): Observable<MdlDialogReference> {

    if (this.isShown) {
      throw new Error('Only one instance of an embedded mdl-dialog can exist!');
    }
    this.isShown = true;

    let mergedConfig: IMdlDialogConfiguration = this.config || {};

    // mdl-modal overwrites config.isModal if present
    mergedConfig.isModal = typeof this.modal !== 'undefined' ? this.modal : mergedConfig.isModal;
    // default is true
    if (typeof mergedConfig.isModal === 'undefined') {
      mergedConfig.isModal = true;
    }

    let result: Subject<any> = new Subject();

    let p = this.dialogService.showDialogTemplate(this.template, mergedConfig);
    p.subscribe((dialogRef: MdlDialogReference) => {

      this.dialogRef = dialogRef;

      this.dialogRef.onVisible().subscribe(() => {
        this.showEmitter.emit(dialogRef);

        result.next(dialogRef);
        result.complete();

      });

      this.dialogRef.onHide().subscribe(() => {
        this.hideEmitter.emit(null);
        this.dialogRef = null;
        this.isShown = false;
      });

    })
    return result.asObservable();
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.hide();
    }
  }
}
