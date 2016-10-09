import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { Component, ViewContainerRef, NgModule } from '@angular/core';
import { DOCUMENT, By } from '@angular/platform-browser';
import { MdlDialogModule } from './index';
import { MdlDialogService, ConfirmResult, MdlDialogReference } from './mdl-dialog.service';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';
import { MdlSimpleDialogComponent } from './mdl-simple-dialog.component';
import { IMdlDialogAction } from './mdl-dialog-configuration';
import { MdlDialogOutletModule } from '../dialog-outlet/index';
import { MdlBackdropOverlayComponent } from '../dialog-outlet/mdl-backdrop-overlay.component';


describe('Service: MdlDialog', () => {

  let mdlDialogService: MdlDialogService;
  let doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      imports: [MdlDialogModule.forRoot(), MdlDialogOutletModule, TestDialogModul],
    });
  }));

  beforeEach(async(inject([MdlDialogService, DOCUMENT], function (service: MdlDialogService, doc_) {
    mdlDialogService = service;
    doc = doc_;
  })));

  it('should show a an alert', ( done: () => void ) => {

    let title = 'Alert';
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let result = mdlDialogService.alert(title);
    result.subscribe( () => {
      // test passed because the action was called
      done();
    } );

    fixture.detectChanges();

    let dialogHostComponent = fixture.debugElement.query(By.directive(MdlDialogHostComponent)).componentInstance;
    expect(dialogHostComponent.zIndex).toBe(100001, 'the zIndex should be 100001');

    // let dialogComponent = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent)).componentInstance;

    // the backdrop shoud be visible and hav an zIndex of 100000
    let backdrop = fixture.debugElement.query(By.directive(MdlBackdropOverlayComponent)).componentInstance;

    expect(backdrop.zIndex).toBe(100000, 'the zIndex of the background should be 100000');

    let dialogComponentDebugElem = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent));
    let titleDiv = dialogComponentDebugElem.query(By.css('.mdl-dialog__content')).nativeElement;
    expect(titleDiv.innerText).toBe(title);

    // close the dialog by clicking the ok button
    let buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();

  });

  it('should show a confirm dialog which is modal and can be closed with click on confirm', ( done: () => void ) => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    let result = mdlDialogService.confirm('?', 'no', 'yes');
    result.then( (r: ConfirmResult) => {
      // test passed because the action was called
      expect(r).toBe(ConfirmResult.Confirmed, 'confirm dialog should be closed with confirmed state');
      done();
    } );

    fixture.detectChanges();

    // the yes button
    let buttonDebugElements = fixture.debugElement.queryAll(By.css('.mdl-button'));
    let buttonEl = buttonDebugElements[0].nativeElement;
    buttonEl.click();
  });


  it('should show a confirm dialog which is modal and can be closed esc', ( done: () => void ) => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let result = mdlDialogService.confirm('?', 'no', 'yes');
    result.then( (r: ConfirmResult) => {
      // test passed because the action was called
      expect(r).toBe(ConfirmResult.Declined, 'confirm dialog should be closed with declined');
      done();
    } );

    fixture.detectChanges();

    let dialog = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent)).componentInstance;
    // sending an keybord event to the dialog would be better
    dialog.onEsc();
  });

  it('should be possible to open a custom dialog', ( done: () => void ) => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog
    });

    p.then( ( dialogRef ) => {

      dialogRef.onHide().subscribe( ( ) => {
        done();
      });

      let customDialogComponent = fixture.debugElement.query(By.directive(TestCustomDialog)).componentInstance;
      // call close by calling hide on the dialog reference
      customDialogComponent.close();
    });

  });

  it('should stop propagaton on overlay clicks', () => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    mdlDialogService.alert('Alert');


    let backdrop = <HTMLDivElement> doc.querySelector('.dialog-backdrop');

    var event = new MouseEvent('click', {});

    spyOn(event, 'stopPropagation');

    backdrop.dispatchEvent(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should not be possible to create a simple dialog without actions', () => {

    expect( () => {

      mdlDialogService.showDialog({
        message: 'x',
        actions: <[IMdlDialogAction]>[]
      });

    }).toThrow();
  });

  it('should not hide the dialog on esc key  if there is no closing action', ( done: () => void ) => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    let pDialogRef = mdlDialogService.showDialog({
      message: 'm',
      actions: [
        { handler: () => {}, text: 'ok'}
      ]
    });

    pDialogRef.then( (dialogRef: MdlDialogReference) => {

      spyOn(dialogRef, 'hide');
      let dialog = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent)).componentInstance;
      // sending an keybord event to the dialog would be better
      dialog.onEsc();

      expect(dialogRef.hide).not.toHaveBeenCalled();

      done();
    });

  });

});



@Component({
  selector: 'test-view',
  template: '<div></div><dialog-outlet></dialog-outlet>'
})
class MdlTestViewComponent {


}

@Component({
  selector: 'test-dialog-component',
  template: '<div>TestCustomDialog</div>'
})
class TestCustomDialog {

  constructor(
    private viewRef: ViewContainerRef,
    private dialog: MdlDialogReference) {}

  get viewContainerRef() {
    return this.viewRef;
  }

  public close() {
    this.dialog.hide();
  }

}

@Component({
  selector: 'test-fail-dialog-component',
  template: '<div>TestFalCustomDialog</div>'
})
class TestFailCustomDialog {

}

@NgModule({
  imports: [],
  exports: [TestCustomDialog],
  declarations: [TestCustomDialog, TestFailCustomDialog],
  providers: [],
  entryComponents: [TestCustomDialog, TestFailCustomDialog]
})
class TestDialogModul {}
