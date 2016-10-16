import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MdlDialogReference } from './mdl-dialog.service';
import { IMdlDialogConfiguration } from './mdl-dialog-configuration';

/**
 * Internal representation of the dialog ref. the service
 * user should not have access to the created components
 * and internal implementations.
 */
export class InternalMdlDialogReference {

  public hostDialogComponentRef: ComponentRef<any>;
  private onHideSubject: Subject<any> = new Subject();
  public closeCallback: () => void;
  public isModal = false;
  public dialogRef: MdlDialogReference;

  constructor(public config: IMdlDialogConfiguration){}

  get  hostDialog() {
    return this.hostDialogComponentRef.instance;
  }

  public hide() {
    this.onHideSubject.next();
    this.onHideSubject.complete();
    this.closeCallback();
  }

  public onHide(): Observable<void> {
    return this.onHideSubject.asObservable();
  }
}
