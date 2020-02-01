import {async, inject, TestBed} from '@angular/core/testing';
import {ApplicationRef, Component, NgModule} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlDialogOutletComponent} from './mdl-dialog-outlet.component';
import {MdlDialogOutletModule} from './mdl-dialog-outlet.module';
import {DOCUMENT} from '@angular/common';
import {MdlDialogInnerOutletComponent} from './mdl-dialog-inner-outlet.component';


@Component({
  // tslint:disable-next-line
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestDialogModul],
    });
  }));

  // now modify the dom and add a dialog-outlet element direct under the body
  beforeEach(async(inject([DOCUMENT], (doc) => {
    el = doc.createElement('dialog-outlet');
    doc.body.appendChild(el);
  })));

  afterEach(async(inject([DOCUMENT], (doc) => {
    doc.body.removeChild(el);
  })));

  // now we can boostrap our MdlDialogOutletComponent component
  it('should create the dialog-outlet outside the app-root',
    async(inject([ApplicationRef],
      (ref: ApplicationRef) => {

        const compRef = ref.bootstrap(MdlDialogOutletComponent);
        expect(compRef).toBeDefined();
        expect(compRef.instance.viewContainerRef).toBeDefined();

      }))
  );


});


describe('MdlDialogInnerOutletComponent', () => {

  let doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestDialogModul],
    });
  }));

  beforeEach(async(inject([DOCUMENT], (document) => {
    doc = document;
  })));

  it('should create the dialog-outlet if within the app-root', () => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const innerComponent = fixture.debugElement.query(By.directive(MdlDialogInnerOutletComponent));

    expect(innerComponent).toBeDefined();
  });

});
