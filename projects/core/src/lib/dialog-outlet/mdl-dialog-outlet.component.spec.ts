import {async, inject, TestBed} from '@angular/core/testing';
import {ApplicationRef, Component, NgModule} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlDialogInnerOutletComponent, MdlDialogOutletComponent} from './mdl-dialog-outlet.component';
import {MdlDialogOutletModule} from './mdl-dialog-outlet.module';
import {DOCUMENT} from '@angular/common';


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
  beforeEach(async(inject([DOCUMENT], function (doc) {
    el = doc.createElement('dialog-outlet');
    doc.body.appendChild(el);
  })));

  afterEach(async(inject([DOCUMENT], function (doc) {
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

  beforeEach(async(inject([DOCUMENT], function (doc_) {
    doc = doc_;
  })));

  it('should create the dialog-outlet if within the app-root', () => {
    let fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    let innerComponent = fixture.debugElement.query(By.directive(MdlDialogInnerOutletComponent));

    expect(innerComponent).toBeDefined();
  });

});


@Component({
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
