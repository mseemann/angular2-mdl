import {inject, TestBed, waitForAsync} from '@angular/core/testing';
import {ApplicationRef, Component, NgModule} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlDialogOutletComponent} from './mdl-dialog-outlet.component';
import {MdlDialogOutletModule} from './mdl-dialog-outlet.module';
import {DOCUMENT} from '@angular/common';
import {MdlDialogInnerOutletComponent} from './mdl-dialog-inner-outlet.component';


@Component({
  // eslint-disable-next-line
  selector: 'test-view',
  template: '<div><dialog-outlet></dialog-outlet></div>'
})
class MdlTestViewComponent {

}


@NgModule({
  imports: [MdlDialogOutletModule.forRoot()],
  exports: [MdlTestViewComponent],
  declarations: [MdlTestViewComponent]
})
class TestDialogModul {
}


describe('MdlDialogOutletComponent', () => {

  let el;

  // create the tesbed
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestDialogModul],
    });
  }));

  // now modify the dom and add a dialog-outlet element direct under the body
  beforeEach(waitForAsync(inject([DOCUMENT], (doc) => {
    el = doc.createElement('dialog-outlet');
    doc.body.appendChild(el);
  })));

  afterEach(waitForAsync(inject([DOCUMENT], (doc) => {
    doc.body.removeChild(el);
  })));

  // now we can boostrap our MdlDialogOutletComponent component
  it('should create the dialog-outlet outside the app-root',
    waitForAsync(inject([ApplicationRef],
      (ref: ApplicationRef) => {

        const compRef = ref.bootstrap(MdlDialogOutletComponent);
        expect(compRef).toBeDefined();
        expect(compRef.instance.viewContainerRef).toBeDefined();

      }))
  );


});


describe('MdlDialogInnerOutletComponent', () => {


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestDialogModul],
    });
  }));


  it('should create the dialog-outlet if within the app-root', () => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const innerComponent = fixture.debugElement.query(By.directive(MdlDialogInnerOutletComponent));

    expect(innerComponent).toBeDefined();
  });

});
