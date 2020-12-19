import {TestBed, waitForAsync} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {MdlDialogModule, MdlDialogReference} from './mdl-dialog.module';
import {By} from '@angular/platform-browser';
import {MdlDialogOutletModule} from '../dialog-outlet/mdl-dialog-outlet.module';
import {MdlDialogComponent} from './mdl-dialog.component';
import {MdlBackdropOverlayComponent} from '../dialog-outlet/mdl-backdrop-overlay.component';


@Component({
  // tslint:disable-next-line
  selector: 'test-component',
  template: `
    <mdl-dialog #dialog (show)="onDialogShow($event)" [mdl-dialog-config]="{isModal: true}" (hide)="onDialogHide()">

    </mdl-dialog>
    <dialog-outlet></dialog-outlet>
  `
})
class MdlTestComponent {

  @ViewChild('dialog', {static: true}) public dialog: MdlDialogComponent;
  public dialogRef: MdlDialogReference;

  public onDialogShow(dialogRef: MdlDialogReference) {
    this.dialogRef = dialogRef;
  }

  public onDialogHide() {
  }

}

@Component({
  // tslint:disable-next-line
  selector: 'test-component-2',
  template: `
    <mdl-dialog #dialog [mdl-dialog-config]="{isModal: true}">
    </mdl-dialog>
    <dialog-outlet></dialog-outlet>
  `
})
class ModalTrueConfigFalseComponent {

  @ViewChild('dialog', {static: true}) public dialog: MdlDialogComponent;

}

@Component({
  // tslint:disable-next-line
  selector: 'test-component-4',
  template: `
    <mdl-dialog #dialog
                [mdl-dialog-config]="{isModal: false}">
    </mdl-dialog>
    <dialog-outlet></dialog-outlet>
  `
})
class ModalFalseConfigTrueComponent {

  @ViewChild('dialog', {static: true}) public dialog: MdlDialogComponent;

}

@Component({
  // tslint:disable-next-line
  selector: 'test-component-4',
  template: `
    <mdl-dialog #dialog
                [mdl-dialog-config]="{}">
    </mdl-dialog>
    <dialog-outlet></dialog-outlet>
  `
})
class ModalComponent {

  @ViewChild('dialog', {static: true}) public dialog: MdlDialogComponent;

}

describe('MdlDialog (embedded/declarative)', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdlDialogModule.forRoot(), MdlDialogOutletModule],
      declarations: [
        MdlTestComponent,
        ModalTrueConfigFalseComponent,
        ModalFalseConfigTrueComponent,
        ModalComponent],
    });
  }));

  it('should create, show and close the embedded dialog', waitForAsync(() => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    const dialog = fixture.componentInstance.dialog;
    expect(dialog).toBeDefined('mdldialog should be created');

    spyOn(fixture.componentInstance, 'onDialogShow').and.callThrough();
    spyOn(fixture.componentInstance, 'onDialogHide');

    dialog.show().subscribe(() => {

      dialog.close();

      expect(fixture.componentInstance.onDialogShow).toHaveBeenCalled();
      expect(fixture.componentInstance.onDialogHide).toHaveBeenCalled();

    });

  }));

  it('should not be possible to create a second embedded dialog', () => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    const dialog = fixture.componentInstance.dialog;

    dialog.show();

    expect(() => {
      dialog.show();
    }).toThrow();

  });


  it('should open a modal dialog if no config for modal is set', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    fixture.detectChanges();

    const dialog = fixture.componentInstance.dialog;
    dialog.show().subscribe(() => {
      const backdrop = fixture.debugElement.query(By.directive(MdlBackdropOverlayComponent)).componentInstance;

      expect(backdrop.display).toBeDefined('should open as modal - because there is no config provided');
    });
  });

  it('should be possible to call close on a dialog that wasn\'t shown yet', () => {

    const fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    const dialog = fixture.componentInstance.dialog;

    // throws if the guard for dialogRef is not present.
    dialog.close();
  });

});
