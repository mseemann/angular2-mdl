import {
  describe,
  expect,
  it,
  inject,
  beforeEach,
  addProviders,
  fakeAsync
} from '@angular/core/testing';
import { Component, ViewContainerRef } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlSnackbarService } from './mdl-snackbar.service';

describe('Service: MdlSnackbar', () => {

  var builder: TestComponentBuilder;
  var mdlSnackbarServcie: MdlSnackbarService;

  beforeEach(() => {
    addProviders([MdlSnackbarService]);
  });

  beforeEach(inject([TestComponentBuilder, MdlSnackbarService],
    function (tcb: TestComponentBuilder, service: MdlSnackbarService) {
    builder = tcb;
    mdlSnackbarServcie = service;
  }));

  it('should show a snackbar and close the snackbar if the aciton button is clicked', ( done ) => {

    return builder
      .createAsync(MdlTestViewComponent).then( (fixture) => {

        fixture.detectChanges();
        fakeAsync(() => {

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

        })();
      });
  });

  it('should show a toastmessage and hide the message automatically', ( done ) => {
    return builder
      .createAsync(MdlTestViewComponent).then( (fixture) => {

        fixture.detectChanges();
        fakeAsync(() => {

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

        })();
      });
  });

  it('should throw if no viewCOntainerRef is provided', () => {
    return builder
      .createAsync(MdlTestViewComponent).then( (fixture) => {

        expect( () => {
          mdlSnackbarServcie.showToast('toast message', 1000);
        }).toThrow();

      });
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
