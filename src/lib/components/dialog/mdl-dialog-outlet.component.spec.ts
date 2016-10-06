import {
  inject,
  TestBed,
  async
} from '@angular/core/testing';
import { Component, NgModule, ApplicationRef } from '@angular/core';
import { DOCUMENT, By } from '@angular/platform-browser';
import { MdlDialogModule } from './index';
import { MdlDialogService } from './mdl-dialog.service';
import { MdlDialogInnerOutletComponent, MdlDialogOutletComponent } from './mdl-dialog-outlet.component';


describe('MdlDialogOutletComponent', () => {

  // create the tesbed
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestDialogModul],
    });
  }));

  // now modify the dom and add a dialog-outlet element direct under the body
  beforeEach(async(inject([DOCUMENT], function (doc) {
    const el = doc.createElement('dialog-outlet');
    doc.body.appendChild( el);
  })));


  // now we can boostrap our MdlDialogOutletComponent component
  it('should create the dialog-outlet if outside the app-root',
    async(inject([ApplicationRef],
      (ref: ApplicationRef) => {

      const compRef = ref.bootstrap(MdlDialogOutletComponent);
      expect(compRef).toBeDefined();
      expect(compRef.instance.viewContainerRef).toBeDefined();

    }))
  );


});


describe('MdlDialogInnerOutletComponent', () => {

  let mdlDialogService: MdlDialogService;
  let doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestDialogModul],
    });
  }));

  beforeEach(async(inject([MdlDialogService, DOCUMENT], function (service: MdlDialogService, doc_) {
    mdlDialogService = service;
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
  imports: [MdlDialogModule.forRoot()],
  exports: [MdlTestViewComponent],
  declarations: [MdlTestViewComponent]
})
class TestDialogModul {}
