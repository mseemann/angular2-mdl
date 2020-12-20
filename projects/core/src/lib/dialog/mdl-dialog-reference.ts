import {InternalMdlDialogReference} from './internal-dialog-reference';
import {Observable} from 'rxjs';

/**
 * The reference to the created and displayed dialog.
 */
export class MdlDialogReference {

  constructor(private internaleRef: InternalMdlDialogReference) {
    internaleRef.dialogRef = this;
  }

  /**
   * closes the dialog
   */
  hide(data?: unknown): void {
    this.internaleRef.hide(data);
  }

  /**
   * Observable that emits, if the dialog was closed.
   * returns {Observable<void>}
   */
  public onHide(): Observable<unknown> {
    return this.internaleRef.onHide();
  }

  /**
   * Observable that emits, if the dialog is really visible and not only created.
   * returns {Observable<void>}
   */
  public onVisible(): Observable<void> {
    return this.internaleRef.onVisible();
  }
}
