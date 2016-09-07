import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { Component, ViewContainerRef } from '@angular/core';
import { MdlSnackbarService } from './mdl-snackbar.service';

describe('Service: MdlSnackbar', () => {

  var mdlSnackbarServcie: MdlSnackbarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      providers: [MdlSnackbarService]
    });
  }));

  beforeEach(async(inject([MdlSnackbarService], function (service: MdlSnackbarService) {
    mdlSnackbarServcie = service;
  })));

  it('should show a snackbar and close the snackbar if the aciton button is clicked', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let viewRef = fixture.debugElement.componentInstance.viewRef;

    mdlSnackbarServcie.setDefaultViewContainerRef(viewRef);
    let p = mdlSnackbarServcie.showSnackbar({
      message: 'm1',
      action: {
        handler: () => {
          // now the test completes because of async
        },
        text: 'OK'
      }
    });

    fixture.detectChanges();
    p.then( (mdlSnackbarComponent) => {

      expect(mdlSnackbarComponent.isActive()).toBe(true);
      mdlSnackbarComponent.onClick();

    });


  }));

  it('should show a toastmessage and hide the message automatically', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();


      let viewRef = fixture.debugElement.componentInstance.viewRef;
      mdlSnackbarServcie.setDefaultViewContainerRef(viewRef);
      let p = mdlSnackbarServcie.showToast('toast message', 1000);

      fixture.detectChanges();

      p.then( (mdlSnackbarComponent) => {

        expect(mdlSnackbarComponent.isActive()).toBe(true);

        setTimeout(() => {
          expect(mdlSnackbarComponent.isActive()).toBe(false);
          // now the test completes because of async
        }, 1500); // > 1000 + 250
      });


  }));

  it('should throw if no viewContainerRef is provided', async(() => {
      expect( () => {
        mdlSnackbarServcie.showToast('toast message', 1000);
      }).toThrow();

  }));

});


@Component({
  selector: 'test-view',
  template: '<div></div>',
  providers: [MdlSnackbarService]
})
class MdlTestViewComponent {

  protected viewRef: ViewContainerRef;
  constructor(viewRef: ViewContainerRef) {
    this.viewRef = viewRef;
  }
}
