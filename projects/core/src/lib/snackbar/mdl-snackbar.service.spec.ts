import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdlSnackbarService} from './mdl-snackbar.service';
import {MdlDialogOutletModule} from '../dialog-outlet/mdl-dialog-outlet.module';
import {MdlDialogOutletService} from '../dialog-outlet/mdl-dialog-outlet.service';
import {MdlSnackbarModule} from './mdl-snackbar.module';


@Component({
  // eslint-disable-next-line
  selector: 'test-view',
  template: '<div></div><dialog-outlet></dialog-outlet>',
  providers: [MdlSnackbarService]
})
class MdlTestViewComponent {

}

describe('Service: MdlSnackbar', () => {

  let mdlSnackbarServcie: MdlSnackbarService;
  let mdlDialogOutletService: MdlDialogOutletService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MdlTestViewComponent],
      imports: [MdlSnackbarModule.forRoot(), MdlDialogOutletModule],
      providers: []
    });
  }));

  beforeEach(waitForAsync(inject([MdlSnackbarService, MdlDialogOutletService],
    (service: MdlSnackbarService, dialogOutletService: MdlDialogOutletService) => {
      mdlSnackbarServcie = service;
      mdlDialogOutletService = dialogOutletService;
    })));

  it('should show a snackbar and close the snackbar if the aciton button is clicked', waitForAsync(() => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlSnackbarServcie.showSnackbar({
      message: 'm1',
      action: {
        handler: () => {
          // now the test completes because of async
        },
        text: 'OK'
      }
    });

    fixture.detectChanges();
    p.subscribe((mdlSnackbarComponent) => {

      expect(mdlSnackbarComponent.isActive()).toBe(true);
      mdlSnackbarComponent.onClick();

    });


  }));

  it('should show a snackbar and close the snackbar if the action button is clicked or after timeout', waitForAsync(() => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();
    const p = mdlSnackbarServcie.showSnackbar({
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
    p.subscribe((mdlSnackbarComponent) => {
      expect(mdlSnackbarComponent.isActive()).toBe(true);
      setTimeout(() => {
        expect(mdlSnackbarComponent.isActive()).toBe(false);
      }, 1500);
    });

  }));

  it('should show a toastmessage and hide the message automatically', (done) => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const p = mdlSnackbarServcie.showToast('toast message', 100);

    fixture.detectChanges();

    p.subscribe((mdlSnackbarComponent) => {

      expect(mdlSnackbarComponent.isActive()).toBe(true);

      mdlSnackbarComponent.hide().subscribe(() => {
        done();
      });
    });

  });

  it('should throw if no viewContainerRef is provided', waitForAsync(() => {

    mdlDialogOutletService.setDefaultViewContainerRef(null);

    expect(() => {
      mdlSnackbarServcie.showToast('toast message', 1000);
    }).toThrow();

  }));

  it('should show one snackbar at a time', waitForAsync(() => {

    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();
    const p = mdlSnackbarServcie.showSnackbar({
      message: 'm1',
      action: {
        handler: () => {
          // now the test completes because of async
        },
        text: 'OK'
      }
    });
    const q = mdlSnackbarServcie.showSnackbar({
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
      setTimeout(() => {
        p.subscribe((mdlSnackbarComponentP) => {
          expect(mdlSnackbarComponentP.isActive()).toBe(false);
        });
      }, 500);
    });

  }));

});
