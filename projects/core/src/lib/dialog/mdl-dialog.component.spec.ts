import {async, TestBed} from '@angular/core/testing';
import {Component, Type, ViewChild} from '@angular/core';
import {MdlDialogModule} from './mdl-dialog.module';
import {By} from '@angular/platform-browser';
import {MdlDialogOutletModule} from '../dialog-outlet/mdl-dialog-outlet.module';
import {MdlDialogComponent} from './mdl-dialog.component';
import {MdlDialogReference} from './mdl-dialog.service';
import {MdlBackdropOverlayComponent} from '../dialog-outlet/mdl-backdrop-overlay.component';


describe('MdlDialog (embedded/declarative)', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdlDialogModule.forRoot(), MdlDialogOutletModule],
      declarations: [
        MdlTestComponent,
        ModalTrueConfigFalseComponent,
        ModalFalseConfigTrueComponent,
        ModalComponent],
    });
  }));

  it('should create, show and close the embedded dialog', async(() => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    let dialog = fixture.componentInstance.dialog;
    expect(dialog).toBeDefined('mdldialog should be created');

    spyOn(fixture.componentInstance, 'onDialogShow').and.callThrough();
    spyOn(fixture.componentInstance, 'onDialogHide');

    dialog.show().subscribe(() => {

      dialog.close();

      expect(fixture.componentInstance.onDialogShow).toHaveBeenCalled();
      expect(fixture.componentInstance.onDialogHide).toHaveBeenCalled();

    })

  }));

  it('should not be possible to create a second embedded dialog', () => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    let dialog = fixture.componentInstance.dialog;

    dialog.show();

    expect(() => {
      dialog.show();
    }).toThrow();

  });

  it('should be possible to override mdl-dialog-config with mdl-modal', () => {

    checkModalConfig(
      ModalTrueConfigFalseComponent,
      'config is false; mdl-modal is true - so the backdrop should not have display none');
    checkModalConfig(
      ModalFalseConfigTrueComponent,
      'modal is false, config true -> should be false'
    );
  })

  it('should open a modal dialog if no config for modal is set', () => {
    let fixture = TestBed.createComponent(ModalComponent);
    fixture.detectChanges();

    let dialog = fixture.componentInstance.dialog;
    dialog.show().subscribe(() => {
      let backdrop = fixture.debugElement.query(By.directive(MdlBackdropOverlayComponent)).componentInstance;

      expect(backdrop.display).toBeDefined('should open as modal - because there is no config provided')
    });
  })

  it('should be possible to call close on a dialog that wasn\'t shown yet', () => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    let dialog = fixture.componentInstance.dialog;

    // throws if the guard for dialogRef is not present.
    dialog.close();
  })

});


function checkModalConfig(component: Type<any>, failMessage: string) {
  let fixture = TestBed.createComponent(component);
  fixture.detectChanges();

  let dialog = fixture.componentInstance.dialog;
  dialog.show().subscribe(() => {
    let backdrop = fixture.debugElement.query(By.directive(MdlBackdropOverlayComponent)).componentInstance;

    expect(backdrop.display).toBe(null, failMessage);
  });
}

@Component({
  selector: 'test-component',
  template: `
    <mdl-dialog #dialog [mdl-modal]="true" (show)="onDialogShow($event)" (hide)="onDialogHide()">

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
  selector: 'test-component-2',
  template: `
    <mdl-dialog #dialog [mdl-modal]="true"
                [mdl-dialog-config]="{isModal: false}">
    </mdl-dialog>
    <dialog-outlet></dialog-outlet>
  `
})
class ModalTrueConfigFalseComponent {

  @ViewChild('dialog', {static: true}) public dialog: MdlDialogComponent;

}

@Component({
  selector: 'test-component-4',
  template: `
    <mdl-dialog #dialog [mdl-modal]="false"
                [mdl-dialog-config]="{isModal: true}">
    </mdl-dialog>
    <dialog-outlet></dialog-outlet>
  `
})
class ModalFalseConfigTrueComponent {

  @ViewChild('dialog', {static: true}) public dialog: MdlDialogComponent;

}

@Component({
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
