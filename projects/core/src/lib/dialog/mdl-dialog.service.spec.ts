import {async, inject, TestBed} from '@angular/core/testing';
import {Component, Inject, InjectionToken, NgModule, Optional, ViewChild, ViewContainerRef} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlDialogModule} from './mdl-dialog.module';
import {MdlDialogReference, MdlDialogService} from './mdl-dialog.service';
import {MdlDialogHostComponent} from './mdl-dialog-host.component';
import {MdlSimpleDialogComponent} from './mdl-simple-dialog.component';
import {IOpenCloseRect} from './mdl-dialog-configuration';
import {MdlDialogOutletModule} from '../dialog-outlet/mdl-dialog-outlet.module';
import {MdlBackdropOverlayComponent} from '../dialog-outlet/mdl-backdrop-overlay.component';
import {MdlDialogOutletService} from '../dialog-outlet/mdl-dialog-outlet.service';
import {MdlButtonComponent} from '../button/mdl-button.component';
import {MdlButtonModule} from '../button/mdl-button.module';
import {DOCUMENT} from '@angular/common';

const TEST = new InjectionToken<any>('test');


@Component({
  // tslint:disable-next-line
  selector: 'test-view',
  template: `
    <div></div>
    <button mdl-button #targetBtn></button>
    <button mdl-button #btn></button>
    <dialog-outlet></dialog-outlet>
  `
})
class MdlTestViewComponent {


  @ViewChild('btn', {static: true}) button: MdlButtonComponent;
  @ViewChild('targetBtn', {static: true}) targetBtn: MdlButtonComponent;

  public getFakeMouseEvent() {
    const mouseEvent = new MouseEvent('click');
    (mouseEvent as any).testtarget = this.targetBtn.elementRef.nativeElement;
    return mouseEvent;
  }

}

@Component({
  // tslint:disable-next-line
  selector: 'test-dialog-component',
  template: '<div>TestCustomDialog</div>'
})
class TestCustomDialogComponent {

  constructor(
    private viewRef: ViewContainerRef,
    private dialog: MdlDialogReference,
    @Optional() @Inject(TEST) public test: string) {
  }

  public close(data?: any) {
    this.dialog.hide(data);
  }

}

@Component({
  // tslint:disable-next-line
  selector: 'test-fail-dialog-component',
  template: '<div>TestFalCustomDialog</div>'
})
class TestFailCustomDialogComponent {

}

@NgModule({
  imports: [],
  exports: [TestCustomDialogComponent],
  declarations: [TestCustomDialogComponent, TestFailCustomDialogComponent],
  providers: [],
  entryComponents: [TestCustomDialogComponent, TestFailCustomDialogComponent]
})
class TestDialogModul {
}

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
    (service: MdlDialogService, dialogOutletService: MdlDialogOutletService, document) => {
      mdlDialogService = service;
      mdlDialogOutletService = dialogOutletService;
      doc = document;
    })));

  xit('should show an alert', async(() => {

    const title = 'Alert';
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const result = mdlDialogService.alert(title);
    result.subscribe(() => {
      // test passed because the action was called
      // async makes sure this is called
    });

    fixture.detectChanges();

    const dialogHostComponent = fixture.debugElement.query(By.directive(MdlDialogHostComponent)).componentInstance;
    expect(dialogHostComponent.zIndex).toBe(100001, 'the zIndex should be 100001');

    // the backdrop shoud be visible and hav an zIndex of 100000
    const backdrop = fixture.debugElement.query(By.directive(MdlBackdropOverlayComponent)).componentInstance;

    expect(backdrop.zIndex).toBe(100000, 'the zIndex of the background should be 100000');

    const dialogComponentDebugElem = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent));

    const titleDiv = dialogComponentDebugElem.query(By.css('.mdl-dialog__content')).nativeElement;
    expect(titleDiv.textContent).toBe(title);

    // close the dialog by clicking the ok button
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonEl.click();

  }));

  xit('should show a confirm dialog which is modal and can be closed with click on confirm', (done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    const result = mdlDialogService.confirm('?', 'no', 'yes');
    result.subscribe(() => {
      // test passed because the action was called
      // async makes sure this is called
      done();
    }, () => {
    });

    fixture.detectChanges();


    const ne: HTMLElement = fixture.debugElement.nativeElement;
    // the yes button
    const buttonDebugElements = ne.querySelectorAll('mdl-dialog-component .mdl-button');
    const buttonEl: HTMLButtonElement = buttonDebugElements[0] as HTMLButtonElement;

    buttonEl.click();
  });


  xit('should show a confirm dialog which is modal and can be closed esc', (done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const result = mdlDialogService.confirm('?', 'no', 'yes');
    result.subscribe(() => {
    }, () => {
      done();
    });

    fixture.detectChanges();

    const dialog = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent)).componentInstance;
    // sending an keybord event to the dialog would be better
    dialog.onEsc();
  });

  xit('should be possible to open a custom dialog', async((done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      providers: [{provide: TEST, useValue: 'test'}]
    });

    p.subscribe((dialogRef) => {

      dialogRef.onHide().subscribe(() => {
        done();
      });

      const customDialogComponent = fixture.debugElement.query(By.directive(TestCustomDialogComponent)).componentInstance;

      // value should be jnjected
      expect(customDialogComponent.test).toBe('test');

      // call close by calling hide on the dialog reference
      customDialogComponent.close();
    });

  }));

  xit('should be able to pass data when hiding a custom dialog', async(() => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent
    });

    p.subscribe((dialogRef) => {

      dialogRef.onHide().subscribe((data) => {
        // async makes sure this is called
        expect(data).toEqual('teststring');
      });

      const customDialogComponent = fixture.debugElement.query(By.directive(TestCustomDialogComponent)).componentInstance;

      // call close by calling hide on the dialog reference
      customDialogComponent.close('teststring');
    });
  }));

  it('should stop propagaton on overlay clicks', async(() => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    mdlDialogService.alert('Alert');


    const backdrop = doc.querySelector('.dialog-backdrop') as HTMLDivElement;

    const event = new MouseEvent('click', {});

    spyOn(event, 'stopPropagation');

    backdrop.dispatchEvent(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  }));

  it('should not be possible to create a simple dialog without actions', async(() => {

    expect(() => {

      mdlDialogService.showDialog({
        message: 'x',
        actions: []
      });

    }).toThrow();
  }));

  xit('should not hide the dialog on esc key  if there is no closing action', async(() => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    const pDialogRef = mdlDialogService.showDialog({
      message: 'm',
      actions: [
        {
          handler: () => {
          }, text: 'ok'
        }
      ]
    });

    pDialogRef.subscribe((dialogRef: MdlDialogReference) => {

      spyOn(dialogRef, 'hide');
      const dialog = fixture.debugElement.query(By.directive(MdlSimpleDialogComponent)).componentInstance;
      // sending an keybord event to the dialog would be better
      dialog.onEsc();

      expect(dialogRef.hide).not.toHaveBeenCalled();

    });

  }));

  it('should throw if no viewContainerRef is provided', async(() => {

    mdlDialogOutletService.setDefaultViewContainerRef(null);

    expect(() => {
      mdlDialogService.alert('m');
    }).toThrow();

  }));

  it('should close the dialog on click on the backdrop if clickOutsideToClose true', async(() => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      isModal: true,
      clickOutsideToClose: true
    });

    p.subscribe((dialogRef) => {

      dialogRef.onHide().subscribe(() => {
        // async -> this have to been called to fullfill all open obseravbles
      });

      const backdrop = doc.querySelector('.dialog-backdrop') as HTMLDivElement;

      const event = new MouseEvent('click', {});

      backdrop.dispatchEvent(event);

    });
  }));

  it('should not close the dialog on click on the backdrop if clickOutsideToClose true', async(() => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      isModal: true,
      clickOutsideToClose: false
    });

    p.subscribe((dialogRef) => {

      const backdrop = doc.querySelector('.dialog-backdrop') as HTMLDivElement;
      expect(backdrop).toBeDefined('dialog-backdrop should be present');

      const event = new MouseEvent('click', {});

      backdrop.dispatchEvent(event);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const dialogHost = fixture.debugElement.query(By.directive(MdlDialogHostComponent));

        expect(dialogHost).toBeDefined('dialog host should not be null - because it is not closed.');

      });

    });
  }));


  xit('should disable animations if animate is false', async(() => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      animate: false
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {

      const dialogHost = fixture.debugElement.query(By.directive(MdlDialogHostComponent));

      expect(dialogHost.componentInstance.isAnimateEnabled()).toBe(false, 'animate should be false');

    });

  }));

  it('should add additional classes and styles to the dialog host', async () => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      styles: {width: '350px'},
      classes: 'a b'
    });

    fixture.detectChanges();

    await fixture.whenStable();

    const ne: HTMLElement = fixture.debugElement.nativeElement;
    const dialogHost: HTMLElement = ne.querySelector('mdl-dialog-host-component');

    expect(dialogHost.style.width).toBe('350px');
    expect(dialogHost.classList.contains('a')).toBe(true, 'should contian class a');
    expect(dialogHost.classList.contains('b')).toBe(true, 'should contian class b');

  });

  it('should open a dialog if openForm is specified', async(() => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      styles: {width: '350px'},
      classes: 'a b',
      openFrom: fixture.componentInstance.button
    });

    p.subscribe((dialogRef) => {

      dialogRef.hide();

    });

  }));

  it('should open a dialog if animation is false', async(() => {


    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      animate: false
    });

    p.subscribe((dialogRef) => {

      dialogRef.hide();

    });

  }));

  it('should open a dialog from a button and close to a mouse event position', async(() => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      styles: {width: '350px'},
      classes: 'a b',
      openFrom: fixture.componentInstance.button,
      closeTo: fixture.componentInstance.getFakeMouseEvent()
    });

    p.subscribe((dialogRef) => {

      dialogRef.hide();

    });

  }));

  it('should open a dialog from a OpenCloseRect ', async(() => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      styles: {width: '350px'},
      classes: 'a b',
      openFrom: ({height: 10, left: 0, top: 0, width: 0} as IOpenCloseRect)
    });

    p.subscribe((dialogRef) => {

      dialogRef.hide();

    });

  }));

  it('should emit an event when the first dialog instance is opened', async(() => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const spy = spyOn(mdlDialogService.onDialogsOpenChanged, 'emit');

    mdlDialogService.onDialogsOpenChanged.subscribe((dialogsOpen) => {
      expect(dialogsOpen).toBe(true);
    });

    mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      providers: [{provide: TEST, useValue: 'test'}]
    });

    mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      providers: [{provide: TEST, useValue: 'test 2'}]
    });

    expect(spy.calls.count()).toEqual(1);
  }));

  it('should emit an event when the last dialog instance is closed', async(() => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const spy = spyOn(mdlDialogService.onDialogsOpenChanged, 'emit');

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      providers: [{provide: TEST, useValue: 'test 1'}]
    });

    const p2 = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      providers: [{provide: TEST, useValue: 'test 2'}]
    });

    mdlDialogService.onDialogsOpenChanged.subscribe((dialogsOpen) => {
      expect(dialogsOpen).toBe(false);
    });

    p.subscribe((dialogRef) => {
      dialogRef.hide();

      p2.subscribe((dialogRef2) => {
        dialogRef2.hide();

        expect(spy.calls.count()).toEqual(2); // 1 open, 1 close.
      });
    });
  }));
});
