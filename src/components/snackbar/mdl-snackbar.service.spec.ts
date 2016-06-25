import {
  describe,
  expect,
  it,
  inject,
  tick,
  beforeEach,
  beforeEachProviders,
  fakeAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Optional, ViewContainerRef } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlSnackbarService } from './mdl-snackbar.service';

describe('Service: MdlSnackbar', () => {

  var builder: TestComponentBuilder;
  var mdlSnackbarServcie: MdlSnackbarService;

  beforeEachProviders(() => [MdlSnackbarService]);

  beforeEach(inject([TestComponentBuilder, MdlSnackbarService], function (tcb: TestComponentBuilder, service:MdlSnackbarService) {
    builder = tcb;
    mdlSnackbarServcie = service;
  }));

  it('should should show and close a snackbar', ( done ) => {

    return builder
      .createAsync(MdlTestViewComponent).then( (fixture) => {

        fixture.detectChanges();
        fakeAsync(() => {

          let viewRef = fixture.debugElement.componentInstance.viewRef;

          mdlSnackbarServcie.setDefaultViewContainerRef(viewRef);
          let p = mdlSnackbarServcie.showSnackbar({
            message:'m1',
            actionHandler: ()=>{
                done();
            }
          });

          fixture.detectChanges();
          p.then( (mdlSnackbarComponent)=>{
            expect(mdlSnackbarComponent.isActive()).toBe(true);
            mdlSnackbarComponent.onClick();
          });


        })();
      })
  });

  it('should show a toastmessage', ( done ) => {
    return builder
      .createAsync(MdlTestViewComponent).then( (fixture) => {

        fixture.detectChanges();
        fakeAsync(() => {

          let viewRef = fixture.debugElement.componentInstance.viewRef;
          mdlSnackbarServcie.setDefaultViewContainerRef(viewRef);
          let p = mdlSnackbarServcie.showToast('toast message', 1000);

          fixture.detectChanges();

          p.then( (mdlSnackbarComponent)=>{
            expect(mdlSnackbarComponent.isActive()).toBe(true);

            setTimeout(()=>{
              //fixture.detectChanges();
              expect(mdlSnackbarComponent.isActive()).toBe(false);
              done();
            }, 1500) // > 1000 + 250
          });

        })();
      })
  })


});


@Component({
  selector: 'test-view',
  template: "<div></div>",
  providers: [MdlSnackbarService]
})
class MdlTestViewComponent {

  viewRef:ViewContainerRef;
  constructor(viewRef:ViewContainerRef){
    this.viewRef = viewRef;
  }
}
