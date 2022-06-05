import { inject, TestBed, waitForAsync } from "@angular/core/testing";
import { ApplicationRef, Component, NgModule } from "@angular/core";
import { By } from "@angular/platform-browser";
import { MdlDialogOutletModule } from "./mdl-dialog-outlet.module";
import { DOCUMENT } from "@angular/common";
import { MdlDialogInnerOutletComponent } from "./mdl-dialog-inner-outlet.component";
import { MdlDialogOutletService } from "./mdl-dialog-outlet.service";
import { take } from "rxjs/operators";

@Component({
  // eslint-disable-next-line
  selector: "test-view",
  template: "<div><dialog-outlet></dialog-outlet></div>",
})
class MdlTestViewComponent {}

@NgModule({
  imports: [MdlDialogOutletModule.forRoot()],
  exports: [MdlTestViewComponent],
  declarations: [MdlTestViewComponent],
})
class TestDialogModul {}

describe("MdlDialogOutletComponent", () => {
  let el: HTMLElement | undefined;

  // create the tesbed
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [MdlDialogOutletModule.forRoot()],
    });
  }));

  // now modify the dom and add a dialog-outlet element direct under the body
  beforeEach(waitForAsync(
    inject([DOCUMENT], (doc: Document) => {
      el = doc.createElement("dialog-outlet");
      doc.body.appendChild(el);
    })
  ));

  afterEach(waitForAsync(
    inject([DOCUMENT], (doc: Document) => {
      if (el) {
        doc.body.removeChild(el);
      }
    })
  ));

  // now we can boostrap our MdlDialogOutletComponent component
  it("should create the dialog-outlet outside the app-root", async () => {
    const ref = TestBed.inject(ApplicationRef);

    const service = TestBed.inject(MdlDialogOutletService);

    await ref.isStable.pipe(take(1)).toPromise();

    expect(service.viewContainerRef).toBeDefined();
  });
});

describe("MdlDialogInnerOutletComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TestDialogModul],
    });
  }));

  it("should create the dialog-outlet if within the app-root", () => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    const innerComponent = fixture.debugElement.query(
      By.directive(MdlDialogInnerOutletComponent)
    );

    expect(innerComponent).toBeDefined();
  });
});
