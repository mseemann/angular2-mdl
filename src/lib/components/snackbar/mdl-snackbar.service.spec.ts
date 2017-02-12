import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { MdlSnackbarService, MdlSnackbaModule } from './mdl-snackbar.service';
import { MdlDialogOutletModule } from '../dialog-outlet/index';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';

describe('Service: MdlSnackbar', () => {

  let mdlSnackbarServcie: MdlSnackbarService;
  let mdlDialogOutletService: MdlDialogOutletService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      imports: [MdlSnackbaModule.forRoot(), MdlDialogOutletModule],
      providers: []
    });
  }));

  beforeEach(async(inject([MdlSnackbarService, MdlDialogOutletService],
    function (service: MdlSnackbarService, mdlDialogOutletService_: MdlDialogOutletService) {
      mdlSnackbarServcie = service;
      mdlDialogOutletService = mdlDialogOutletService_;
  })));

  it('should show a snackbar and close the snackbar if the aciton button is clicked', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

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
    p.subscribe( (mdlSnackbarComponent) => {

      expect(mdlSnackbarComponent.isActive()).toBe(true);
      mdlSnackbarComponent.onClick();

    });


  }));

  it('should show a snackbar and close the snackbar if the action button is clicked or after timeout', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();
    let p = mdlSnackbarServcie.showSnackbar({
      message: 'm1',
      timeout: 1000,
      closeAfterTimeout: true,
      action: {
        handler: () => {
          // now the test completes because of async
        },
        text: 'OK'
      }
    });
    fixture.detectChanges();
    p.subscribe( (mdlSnackbarComponent) => {
      expect(mdlSnackbarComponent.isActive()).toBe(true);
      setTimeout(() => {
        expect(mdlSnackbarComponent.isActive()).toBe(false);
      }, 1500)
    });

  }));

  it('should show a toastmessage and hide the message automatically', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let p = mdlSnackbarServcie.showToast('toast message', 100);

    fixture.detectChanges();

    p.subscribe( (mdlSnackbarComponent) => {

      expect(mdlSnackbarComponent.isActive()).toBe(true);

      mdlSnackbarComponent.hide().subscribe( ( ) => {
        done();
      });
    });

  });

  it('should throw if no viewContainerRef is provided', async(() => {

    mdlDialogOutletService.setDefaultViewContainerRef(null);

    expect( () => {
      mdlSnackbarServcie.showToast('toast message', 1000);
    }).toThrow();

  }));

  it('should show one snackbar at a time', async(() => {

    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();
    let p = mdlSnackbarServcie.showSnackbar({
      message: 'm1',
      action: {
        handler: () => {
          // now the test completes because of async
        },
        text: 'OK'
      }
    });
    let q = mdlSnackbarServcie.showSnackbar({
      message: 'm2',
      action: {
        handler: () => {
          // now the test completes because of async
        },
        text: 'OK'
      }
    });
    fixture.detectChanges();

    q.subscribe((mdlSnackbarComponentQ) => {
      expect(mdlSnackbarComponentQ.isActive()).toBe(true);
      setTimeout(()=> {
        p.subscribe((mdlSnackbarComponentP) => {
          expect(mdlSnackbarComponentP.isActive()).toBe(false);
        })
      }, 500);
    });

  }));

});


@Component({
  selector: 'test-view',
  template: '<div></div><dialog-outlet></dialog-outlet>',
  providers: [MdlSnackbarService]
})
class MdlTestViewComponent {

}
