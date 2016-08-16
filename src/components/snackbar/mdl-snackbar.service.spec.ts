import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component, ViewContainerRef } from '@angular/core';
import { MdlSnackbarService } from './mdl-snackbar.service';

describe('Service: MdlSnackbar', () => {

  var mdlSnackbarServcie: MdlSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      providers: [MdlSnackbarService]
    });
  });

  beforeEach(inject([MdlSnackbarService], function (service: MdlSnackbarService) {
    mdlSnackbarServcie = service;
  }));

  it('should show a snackbar and close the snackbar if the aciton button is clicked', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let viewRef = fixture.debugElement.componentInstance.viewRef;

    mdlSnackbarServcie.setDefaultViewContainerRef(viewRef);
    let p = mdlSnackbarServcie.showSnackbar({
      message: 'm1',
      action: {
        handler: () => {
          done();
        },
        text: 'OK'
      }
    });

    fixture.detectChanges();
    p.then( (mdlSnackbarComponent) => {

      expect(mdlSnackbarComponent.isActive()).toBe(true);
      mdlSnackbarComponent.onClick();

    });


  });

  it('should show a toastmessage and hide the message automatically', ( done ) => {

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
          done();
        }, 1500); // > 1000 + 250
      });


  });

  it('should throw if no viewContainerRef is provided', ( done ) => {
      expect( () => {
        mdlSnackbarServcie.showToast('toast message', 1000);
      }).toThrow();

      done();
  });

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
