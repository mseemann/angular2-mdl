import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { Component, ViewContainerRef, NgModule, Optional, Inject, OpaqueToken } from '@angular/core';
import { DOCUMENT, By } from '@angular/platform-browser';
import { MdlDialogModule } from './index';
import {
  MdlDialogService,
  MdlDialogReference
} from './mdl-dialog.service';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';
import { MdlSimpleDialogComponent } from './mdl-simple-dialog.component';
import { IMdlDialogAction } from './mdl-dialog-configuration';
import { MdlDialogOutletModule } from '../dialog-outlet/index';
import { MdlBackdropOverlayComponent } from '../dialog-outlet/mdl-backdrop-overlay.component';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';

const TEST = new OpaqueToken('test');

describe('Service: MdlDialog', () => {

  let mdlDialogService: MdlDialogService;
  let mdlDialogOutletService: MdlDialogOutletService;
  let doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      imports: [MdlDialogModule.forRoot(), MdlDialogOutletModule, TestDialogModul],
    });
  }));

  beforeEach(async(inject([MdlDialogService, MdlDialogOutletService, DOCUMENT],
    function (service: MdlDialogService, mdlDialogOutletService_: MdlDialogOutletService, doc_) {
    mdlDialogService = service;
    mdlDialogOutletService = mdlDialogOutletService_;
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
    result.subscribe( () => {
      // test passed because the action was called
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
    result.subscribe( () => {}, () => {
      // test passed because the action was called;
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
      component: TestCustomDialog,
      providers: [{ provide: TEST, useValue: 'test'}]
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.onHide().subscribe( ( ) => {
        done();
      });

      let customDialogComponent = fixture.debugElement.query(By.directive(TestCustomDialog)).componentInstance;

      // value should be jnjected
      expect(customDialogComponent.test).toBe("test");

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

    pDialogRef.subscribe( (dialogRef: MdlDialogReference) => {

      spyOn(dialogRef, 'hide');
      let dialog = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent)).componentInstance;
      // sending an keybord event to the dialog would be better
      dialog.onEsc();

      expect(dialogRef.hide).not.toHaveBeenCalled();

      done();
    });

  });

  it('should throw if no viewContainerRef is provided', async(() => {

    mdlDialogOutletService.setDefaultViewContainerRef(null);

    expect( () => {
      mdlDialogService.alert('m');
    }).toThrow();

  }));

  it('should close the dialog on click on the backdrop if clickOutsideToClose true', () => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      isModal: true,
      clickOutsideToClose: true
    });

    p.subscribe( ( dialogRef ) => {

      let backdrop = <HTMLDivElement> doc.querySelector('.dialog-backdrop');

      var event = new MouseEvent('click', {});

      backdrop.dispatchEvent(event);

      fixture.detectChanges();
      fixture.whenStable().then( () => {
        let dialogHost = fixture.debugElement.query(By.directive(MdlDialogHostComponent));

        expect(dialogHost).toBeNull('dialog host should be null - because it is closed.');

      });

    });
  })

  it('should not close the dialog on click on the backdrop if clickOutsideToClose true', () => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      isModal: true,
      clickOutsideToClose: false
    });

    p.subscribe( ( dialogRef ) => {

      let backdrop = <HTMLDivElement> doc.querySelector('.dialog-backdrop');

      var event = new MouseEvent('click', {});

      backdrop.dispatchEvent(event);

      fixture.detectChanges();
      fixture.whenStable().then( () => {
        let dialogHost = fixture.debugElement.query(By.directive(MdlDialogHostComponent));

        expect(dialogHost).toBeDefined('dialog host should not be null - because it is not closed.');

      });

    });
  });


  it('should disable animations if animate is false', () => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      animate: false
    });

    fixture.detectChanges();

    fixture.whenStable().then( () => {

      let dialogHost = fixture.debugElement.query(By.directive(MdlDialogHostComponent));

      expect(dialogHost.componentInstance.isAnimateEnabled()).toBe(false, 'animate should be false');
      
    })

  });

  it('should add additional classes and styles to the dialog host', () => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      styles: {'width':'350px'},
      classes: 'a b'
    });

    fixture.detectChanges();

    fixture.whenStable().then( () => {

      let dialogHost = fixture.debugElement.query(By.directive(MdlDialogHostComponent)).nativeElement;

      expect(dialogHost.style.width).toBe('350px');
      expect(dialogHost.classList.contains('a')).toBe(true, 'should contian class a');
      expect(dialogHost.classList.contains('b')).toBe(true, 'should contian class b');
    })
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
    private dialog: MdlDialogReference,
    @Optional() @Inject(TEST) public test: string) {}

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
