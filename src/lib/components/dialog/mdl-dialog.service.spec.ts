import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { Component, ViewContainerRef, NgModule, Optional, Inject, OpaqueToken, ViewChild } from '@angular/core';
import { DOCUMENT, By } from '@angular/platform-browser';
import { MdlDialogModule } from './index';
import {
  MdlDialogService,
  MdlDialogReference
} from './mdl-dialog.service';
import { MdlDialogHostComponent } from './mdl-dialog-host.component';
import { MdlSimpleDialogComponent } from './mdl-simple-dialog.component';
import { IMdlDialogAction, IOpenCloseRect } from './mdl-dialog-configuration';
import { MdlDialogOutletModule } from '../dialog-outlet/index';
import { MdlBackdropOverlayComponent } from '../dialog-outlet/mdl-backdrop-overlay.component';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';
import { MdlButtonComponent, MdlButtonModule } from '../button/mdl-button.component';

const TEST = new OpaqueToken('test');

describe('Service: MdlDialog', () => {

  let mdlDialogService: MdlDialogService;
  let mdlDialogOutletService: MdlDialogOutletService;
  let doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      imports: [
        MdlDialogModule.forRoot(),
        MdlDialogOutletModule,
        TestDialogModul,
        MdlButtonModule.forRoot()],
    });
  }));

  beforeEach(async(inject([MdlDialogService, MdlDialogOutletService, DOCUMENT],
    function (service: MdlDialogService, mdlDialogOutletService_: MdlDialogOutletService, doc_) {
    mdlDialogService = service;
    mdlDialogOutletService = mdlDialogOutletService_;
    doc = doc_;
  })));

  it('should show an alert', async(() => {

    let title = 'Alert';
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let result = mdlDialogService.alert(title);
    result.subscribe( () => {
      // test passed because the action was called
      // async makes sure this is called
    } );

    fixture.detectChanges();

    let dialogHostComponent = fixture.debugElement.query(By.directive(MdlDialogHostComponent)).componentInstance;
    expect(dialogHostComponent.zIndex).toBe(100001, 'the zIndex should be 100001');

    // the backdrop shoud be visible and hav an zIndex of 100000
    let backdrop = fixture.debugElement.query(By.directive(MdlBackdropOverlayComponent)).componentInstance;

    expect(backdrop.zIndex).toBe(100000, 'the zIndex of the background should be 100000');

    let dialogComponentDebugElem = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent));

    let titleDiv = dialogComponentDebugElem.query(By.css('.mdl-dialog__content')).nativeElement;
    expect(titleDiv.textContent).toBe(title);

    // close the dialog by clicking the ok button
    let buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();

  }));

  it('should show a confirm dialog which is modal and can be closed with click on confirm', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    let result = mdlDialogService.confirm('?', 'no', 'yes');
    result.subscribe( () => {
      // test passed because the action was called
      // async makes sure this is called
    }, () => {
    } );

    fixture.detectChanges();

    // the yes button
    let dialogDebugEl = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent));
    let buttonDebugElements = dialogDebugEl.queryAll(By.css('.mdl-button'));
    let buttonEl = buttonDebugElements[0].nativeElement;

    buttonEl.click();
  }));


  it('should show a confirm dialog which is modal and can be closed esc', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let result = mdlDialogService.confirm('?', 'no', 'yes');
    result.subscribe( () => {}, () => {
      // test passed because the action was called;
      // async makes sure this is called
    } );

    fixture.detectChanges();

    let dialog = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent)).componentInstance;
    // sending an keybord event to the dialog would be better
    dialog.onEsc();
  }));

  it('should be possible to open a custom dialog', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      providers: [{ provide: TEST, useValue: 'test'}]
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.onHide().subscribe( ( ) => {
        // async makes sure this is called
      });

      let customDialogComponent = fixture.debugElement.query(By.directive(TestCustomDialog)).componentInstance;

      // value should be jnjected
      expect(customDialogComponent.test).toBe("test");

      // call close by calling hide on the dialog reference
      customDialogComponent.close();
    });

  }));

  it('should be able to pass data when hiding a custom dialog', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.onHide().subscribe( ( data ) => {
        // async makes sure this is called
        expect(data).toEqual('teststring');
      });

      let customDialogComponent = fixture.debugElement.query(By.directive(TestCustomDialog)).componentInstance;

      // call close by calling hide on the dialog reference
      customDialogComponent.close('teststring');
    });
  }));

  it('should stop propagaton on overlay clicks', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    mdlDialogService.alert('Alert');


    let backdrop = <HTMLDivElement> doc.querySelector('.dialog-backdrop');

    var event = new MouseEvent('click', {});

    spyOn(event, 'stopPropagation');

    backdrop.dispatchEvent(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  }));

  it('should not be possible to create a simple dialog without actions', async(() => {

    expect( () => {

      mdlDialogService.showDialog({
        message: 'x',
        actions: <[IMdlDialogAction]>[]
      });

    }).toThrow();
  }));

  it('should not hide the dialog on esc key  if there is no closing action', async(() => {
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

    });

  }));

  it('should throw if no viewContainerRef is provided', async(() => {

    mdlDialogOutletService.setDefaultViewContainerRef(null);

    expect( () => {
      mdlDialogService.alert('m');
    }).toThrow();

  }));

  it('should close the dialog on click on the backdrop if clickOutsideToClose true', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      isModal: true,
      clickOutsideToClose: true
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.onHide().subscribe( () => {
         // async -> this have to been called to fullfill all open obseravbles
      });

      let backdrop = <HTMLDivElement> doc.querySelector('.dialog-backdrop');

      var event = new MouseEvent('click', {});

      backdrop.dispatchEvent(event);

    });
  }));

  it('should not close the dialog on click on the backdrop if clickOutsideToClose true', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      isModal: true,
      clickOutsideToClose: false
    });

    p.subscribe( ( dialogRef ) => {

      let backdrop = <HTMLDivElement> doc.querySelector('.dialog-backdrop');
      expect(backdrop).toBeDefined('dialog-backdrop should be present')

      var event = new MouseEvent('click', {});

      backdrop.dispatchEvent(event);

      fixture.detectChanges();
      fixture.whenStable().then( () => {
        let dialogHost = fixture.debugElement.query(By.directive(MdlDialogHostComponent));

        expect(dialogHost).toBeDefined('dialog host should not be null - because it is not closed.');

      });

    });
  }));


  it('should disable animations if animate is false', async(() => {
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

  }));

  it('should add additional classes and styles to the dialog host', async(() => {
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
  }));

  it('should open a dialog if openForm is specified', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      styles: {'width':'350px'},
      classes: 'a b',
      openFrom: fixture.componentInstance.button
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.hide();

    });

  }));

  it('should open a dialog if animation is false', async(() => {


    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      animate: false
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.hide();

    });

  }));

  it('should open a dialog from a button and close to a mouse event position', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      styles: {'width':'350px'},
      classes: 'a b',
      openFrom: fixture.componentInstance.button,
      closeTo: fixture.componentInstance.getFakeMouseEvent()
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.hide();

    });

  }));

  it('should open a dialog from a OpenCloseRect ', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      styles: {'width':'350px'},
      classes: 'a b',
      openFrom: ({ height: 10, left: 0, top: 0, width: 0} as IOpenCloseRect)
    });

    p.subscribe( ( dialogRef ) => {

      dialogRef.hide();

    });

  }));

  it('should emit an event when the first dialog instance is opened', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let spy = spyOn(mdlDialogService.onDialogsOpenChanged, 'emit');

    mdlDialogService.onDialogsOpenChanged.subscribe( ( dialogsOpen ) => {
      expect(dialogsOpen).toBe(true);
    });

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      providers: [{ provide: TEST, useValue: 'test'}]
    });

    let p2 = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      providers: [{ provide: TEST, useValue: 'test 2'}]
    });

    expect(spy.calls.count()).toEqual(1);
  }));

  it('should emit an event when the last dialog instance is closed', async(() => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let spy = spyOn(mdlDialogService.onDialogsOpenChanged, 'emit');

    let p = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      providers: [{ provide: TEST, useValue: 'test 1'}]
    });

    let p2 = mdlDialogService.showCustomDialog({
      component: TestCustomDialog,
      providers: [{ provide: TEST, useValue: 'test 2'}]
    });

    mdlDialogService.onDialogsOpenChanged.subscribe( ( dialogsOpen ) => {
      expect(dialogsOpen).toBe(false);
    });

    p.subscribe( ( dialogRef ) => {
      dialogRef.hide();

      p2.subscribe( ( dialogRef2 ) => {
        dialogRef2.hide();

        expect(spy.calls.count()).toEqual(2); // 1 open, 1 close.
      });
    });
  }));
});



@Component({
  selector: 'test-view',
  template: `
    <div></div>
    <button mdl-button #targetBtn></button>
    <button mdl-button #btn></button>
    <dialog-outlet></dialog-outlet>
  `
})
class MdlTestViewComponent {



  @ViewChild('btn') button: MdlButtonComponent;
  @ViewChild('targetBtn') targetBtn: MdlButtonComponent;

  public getFakeMouseEvent(){
    let mouseEvent = new MouseEvent('click');
    mouseEvent['testtarget'] = this.targetBtn.elementRef.nativeElement;
    return mouseEvent;
  }

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

  public close(data?: any) {
    this.dialog.hide(data);
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
