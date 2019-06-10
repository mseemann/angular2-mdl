import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {MdlDialogReference, MdlDialogService} from './mdl-dialog.service';
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
  // tslint:disable-next-line
  @Input('mdl-dialog-config') public config: IMdlDialogConfiguration;
  // tslint:disable-next-line
  @Output('show') public showEmitter: EventEmitter<MdlDialogReference> = new EventEmitter<MdlDialogReference>();
  // tslint:disable-next-line
  @Output('hide') public hideEmitter: EventEmitter<void> = new EventEmitter<void>();
  private isShown = false;
  private dialogRef: MdlDialogReference = null;

  constructor(private dialogService: MdlDialogService) {
  }

  public show(): Observable<MdlDialogReference> {

    if (this.isShown) {
      throw new Error('Only one instance of an embedded mdl-dialog can exist!');
    }
    this.isShown = true;

    const mergedConfig: IMdlDialogConfiguration = this.config || {};

    // default is true
    if (typeof mergedConfig.isModal === 'undefined') {
      mergedConfig.isModal = true;
    }

    const result: Subject<any> = new Subject();

    const p = this.dialogService.showDialogTemplate(this.template, mergedConfig);
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

    });
    return result.asObservable();
  }

  public close() {
    if (this.dialogRef) {
      this.dialogRef.hide();
    }
  }
}
