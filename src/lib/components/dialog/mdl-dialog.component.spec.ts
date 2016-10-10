import { TestBed, async } from '@angular/core/testing';
import {
  Component,
  ViewChild
} from '@angular/core';
import { MdlDialogModule } from './index';
import { By } from '@angular/platform-browser';
import { MdlDialogOutletModule } from '../dialog-outlet/index';
import { MdlDialogComponent } from './mdl-dialog.component';
import { MdlDialogReference } from './mdl-dialog.service';


describe('MdlDialog (embedded/declarative)', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdlDialogModule.forRoot(), MdlDialogOutletModule],
      declarations: [MdlTestComponent],
    });
  }));

  it('should create, show and close the embedded dialog', async(() => {

    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();
    let dialog = fixture.componentInstance.dialog;
    expect(dialog).toBeDefined('mdldialog should be created');

    spyOn(fixture.componentInstance, 'onDialogShow').and.callThrough();
    spyOn(fixture.componentInstance, 'onDialogHide');

    dialog.show().subscribe( () => {

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

    expect( () => {
      dialog.show();
    }).toThrow();

  });

});


@Component({
  selector: 'test-component',
  template: `
    <mdl-dialog #dialog [mdl-modal]="false" (show)="onDialogShow($event)" (hide)="onDialogHide()">

    </mdl-dialog>
    <dialog-outlet></dialog-outlet>
  `
})
class MdlTestComponent {

  @ViewChild('dialog') public  dialog: MdlDialogComponent;
  public dialogRef: MdlDialogReference;

  public onDialogShow(dialogRef: MdlDialogReference){
    this.dialogRef = dialogRef;
  }

  public onDialogHide(){}

}
