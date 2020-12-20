import {ComponentRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {IMdlDialogConfiguration} from './mdl-dialog-configuration';
import {MdlDialogReference} from './mdl-dialog-reference';
import {MdlDialogHostComponent} from './mdl-dialog-host.component';

/**
 * Internal representation of the dialog ref. the service
 * user should not have access to the created components
 * and internal implementations.
 */
export class InternalMdlDialogReference {

  hostDialogComponentRef: ComponentRef<MdlDialogHostComponent>;
  closeCallback: () => void;
  isModal = false;
  dialogRef: MdlDialogReference;

  private onHideSubject: Subject<unknown> = new Subject();
  private onVisibleSubject: Subject<void> = new Subject();

  constructor(public config: IMdlDialogConfiguration) {
    this.dialogRef = new MdlDialogReference(this);
  }

  get hostDialog(): MdlDialogHostComponent {
    return this.hostDialogComponentRef.instance;
  }

  hide(data?: unknown): void {
    this.onHideSubject.next(data);
    this.onHideSubject.complete();
    this.closeCallback();
  }

  visible(): void {
    this.onVisibleSubject.next();
    this.onVisibleSubject.complete();
  }

  public onHide(): Observable<unknown> {
    return this.onHideSubject.asObservable();
  }

  public onVisible(): Observable<void> {
    return this.onVisibleSubject.asObservable();
  }
}
