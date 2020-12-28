import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from "@angular/core/testing";
import {
  Component,
  Inject,
  InjectionToken,
  NgModule,
  Optional,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { By } from "@angular/platform-browser";
import { MdlDialogModule, MdlDialogReference } from "./mdl-dialog.module";
import { MdlDialogService } from "./mdl-dialog.service";
import { MdlDialogHostComponent } from "./mdl-dialog-host.component";
import { MdlSimpleDialogComponent } from "./mdl-simple-dialog.component";
import { IOpenCloseRect } from "./mdl-dialog-configuration";
import { MdlDialogOutletModule } from "../dialog-outlet/mdl-dialog-outlet.module";
import { MdlDialogOutletService } from "../dialog-outlet/mdl-dialog-outlet.service";
import { MdlButtonComponent } from "../button/mdl-button.component";
import { MdlButtonModule } from "../button/mdl-button.module";
import { DOCUMENT } from "@angular/common";
import { MdlBackdropOverlayComponent } from "./../dialog-outlet/mdl-backdrop-overlay.component";

const TEST = new InjectionToken<string>("test");

// https://github.com/angular/angular/issues/36623
// https://angular.io/api/core/global/ngGetComponent

declare const ng: {
  getComponent<T>(element: Element): T | null;
};

const getComponent = <T>(
  fixture: ComponentFixture<unknown>,
  cssQuery: string
): T => {
  const componentElement = getNativeElement(fixture, cssQuery);
  return ng.getComponent(componentElement);
};

const getNativeElement = (
  fixture: ComponentFixture<unknown>,
  cssQuery: string
): HTMLElement => {
  return fixture.nativeElement.querySelector(cssQuery);
};

@Component({
  // eslint-disable-next-line
  selector: "test-view",
  template: `
    <div></div>
    <button mdl-button #targetBtn></button>
    <button mdl-button #btn></button>
    <dialog-outlet></dialog-outlet>
  `,
})
class MdlTestViewComponent {
  @ViewChild("btn", { static: true }) button: MdlButtonComponent;
  @ViewChild("targetBtn", { static: true }) targetBtn: MdlButtonComponent;

  public getFakeMouseEvent() {
    const mouseEvent = new MouseEvent("click");
    // eslint-disable-next-line
    (mouseEvent as any).testtarget = this.targetBtn.elementRef.nativeElement;
    return mouseEvent;
  }
}

@Component({
  // eslint-disable-next-line
  selector: "test-dialog-component",
  template: "<div>TestCustomDialog</div>",
})
class TestCustomDialogComponent {
  constructor(
    private viewRef: ViewContainerRef,
    private dialog: MdlDialogReference,
    @Optional() @Inject(TEST) public test: string
  ) {}

  close(data?: unknown): void {
    this.dialog.hide(data);
  }
}

@Component({
  // eslint-disable-next-line
  selector: "test-fail-dialog-component",
  template: "<div>TestFalCustomDialog</div>",
})
class TestFailCustomDialogComponent {}

@NgModule({
  imports: [],
  exports: [TestCustomDialogComponent],
  declarations: [TestCustomDialogComponent, TestFailCustomDialogComponent],
  providers: [],
  entryComponents: [TestCustomDialogComponent, TestFailCustomDialogComponent],
})
class TestDialogModul {}

describe("Service: MdlDialog", () => {
  let mdlDialogService: MdlDialogService;
  let mdlDialogOutletService: MdlDialogOutletService;
  let doc: HTMLDocument;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MdlTestViewComponent],
        imports: [
          MdlDialogModule.forRoot(),
          MdlDialogOutletModule,
          TestDialogModul,
          MdlButtonModule.forRoot(),
        ],
      });
    })
  );

  beforeEach(
    waitForAsync(
      inject(
        [MdlDialogService, MdlDialogOutletService, DOCUMENT],
        (
          service: MdlDialogService,
          dialogOutletService: MdlDialogOutletService,
          document
        ) => {
          mdlDialogService = service;
          mdlDialogOutletService = dialogOutletService;
          doc = document;
        }
      )
    )
  );

  it("should show an alert", (done) => {
    const title = "Alert";
    const fixture = TestBed.createComponent(MdlTestViewComponent);

    const result = mdlDialogService.alert(title);
    result.subscribe(() => done());

    fixture.detectChanges();

    const dialogHostComponent: MdlDialogHostComponent = getComponent(
      fixture,
      "mdl-dialog-host-component"
    );

    expect(dialogHostComponent.zIndex).toBe(
      100001,
      "the zIndex should be 100001"
    );

    // the backdrop shoud be visible and have an zIndex of 100000
    const backdrop: MdlBackdropOverlayComponent = getComponent(
      fixture,
      "mdl-backdrop-overlay"
    );

    expect(backdrop.zIndex).toBe(
      100000,
      "the zIndex of the background should be 100000"
    );

    const titleDiv = getNativeElement(fixture, ".mdl-dialog__content");
    expect(titleDiv.textContent).toBe(title);

    // close the dialog by clicking the ok button
    const buttonEl = getNativeElement(fixture, ".mdl-button--primary");
    buttonEl.click();
  });

  it("should show a confirm dialog which is modal and can be closed with click on confirm", (done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);

    const result = mdlDialogService.confirm("?", "no", "yes");
    result.subscribe(() => {
      done();
    });

    fixture.detectChanges();

    const ne: HTMLElement = fixture.debugElement.nativeElement;
    // the yes button
    const buttonDebugElements = ne.querySelectorAll(
      "mdl-dialog-component .mdl-button"
    );
    const buttonEl: HTMLButtonElement = buttonDebugElements[0] as HTMLButtonElement;

    buttonEl.click();
  });

  it("should show a confirm dialog which is modal and can be closed esc", (done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);

    const result = mdlDialogService.confirm("?", "no", "yes");

    result.subscribe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => {
        done();
      }
    );

    fixture.detectChanges();

    const dialog: MdlSimpleDialogComponent = getComponent(
      fixture,
      "mdl-dialog-component"
    );
    // sending an keybord event to the dialog would be better
    dialog.onEsc();
  });

  it("should be possible to open a custom dialog", (done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      providers: [{ provide: TEST, useValue: "test" }],
    });

    p.subscribe((dialogRef) => {
      dialogRef.onHide().subscribe(() => {
        done();
      });

      const customDialogComponent: TestCustomDialogComponent = getComponent(
        fixture,
        "test-dialog-component"
      );

      // value should be jnjected
      expect(customDialogComponent.test).toBe("test");

      // call close by calling hide on the dialog reference
      customDialogComponent.close();
    });

    fixture.detectChanges();
  });

  it("should be able to pass data when hiding a custom dialog", (done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);

    const p = mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
    });

    p.subscribe((dialogRef) => {
      dialogRef.onHide().subscribe((data) => {
        // async makes sure this is called
        expect(data).toEqual("teststring");
        done();
      });

      const customDialogComponent: TestCustomDialogComponent = getComponent(
        fixture,
        "test-dialog-component"
      );

      // call close by calling hide on the dialog reference
      customDialogComponent.close("teststring");
    });

    fixture.detectChanges();
  });

  it(
    "should stop propagaton on overlay clicks",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      mdlDialogService.alert("Alert");

      const backdrop = doc.querySelector(".dialog-backdrop") as HTMLDivElement;

      const event = new MouseEvent("click", {});

      spyOn(event, "stopPropagation");

      backdrop.dispatchEvent(event);

      expect(event.stopPropagation).toHaveBeenCalled();
    })
  );

  it(
    "should not be possible to create a simple dialog without actions",
    waitForAsync(() => {
      expect(() => {
        mdlDialogService.showDialog({
          message: "x",
          actions: [],
        });
      }).toThrow();
    })
  );

  it("should not hide the dialog on esc key  if there is no closing action", (done) => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);

    const pDialogRef = mdlDialogService.showDialog({
      message: "m",
      actions: [
        {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          handler: () => {},
          text: "ok",
        },
      ],
    });

    pDialogRef.subscribe((dialogRef: MdlDialogReference) => {
      spyOn(dialogRef, "hide");
      const dialog = fixture.debugElement.query(
        By.directive(MdlSimpleDialogComponent)
      ).componentInstance;
      // sending an keybord event to the dialog would be better
      dialog.onEsc();

      expect(dialogRef.hide).not.toHaveBeenCalled();

      done();
    });
    fixture.detectChanges();
  });

  it(
    "should throw if no viewContainerRef is provided",
    waitForAsync(() => {
      mdlDialogOutletService.setDefaultViewContainerRef(null);

      expect(() => {
        mdlDialogService.alert("m");
      }).toThrow();
    })
  );

  it(
    "should close the dialog on click on the backdrop if clickOutsideToClose true",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const p = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        isModal: true,
        clickOutsideToClose: true,
      });

      p.subscribe((dialogRef) => {
        dialogRef.onHide().subscribe(() => {
          // async -> this have to been called to fullfill all open obseravbles
        });

        const backdrop = doc.querySelector(
          ".dialog-backdrop"
        ) as HTMLDivElement;

        const event = new MouseEvent("click", {});

        backdrop.dispatchEvent(event);
      });
    })
  );

  it(
    "should not close the dialog on click on the backdrop if clickOutsideToClose true",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const p = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        isModal: true,
        clickOutsideToClose: false,
      });

      p.subscribe(() => {
        const backdrop = doc.querySelector(
          ".dialog-backdrop"
        ) as HTMLDivElement;
        expect(backdrop).toBeDefined("dialog-backdrop should be present");

        const event = new MouseEvent("click", {});

        backdrop.dispatchEvent(event);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const dialogHost = fixture.debugElement.query(
            By.directive(MdlDialogHostComponent)
          );

          expect(dialogHost).toBeDefined(
            "dialog host should not be null - because it is not closed."
          );
        });
      });
    })
  );

  it(
    "should disable animations if animate is false",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        animate: false,
      });

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const dialogHost = fixture.debugElement.query(
          By.directive(MdlDialogHostComponent)
        );

        expect(dialogHost.componentInstance.isAnimateEnabled()).toBe(
          false,
          "animate should be false"
        );
      });
    })
  );

  it("should add additional classes and styles to the dialog host", async () => {
    const fixture = TestBed.createComponent(MdlTestViewComponent);
    fixture.detectChanges();

    mdlDialogService.showCustomDialog({
      component: TestCustomDialogComponent,
      styles: { width: "350px" },
      classes: "a b",
    });

    fixture.detectChanges();

    await fixture.whenStable();

    const ne: HTMLElement = fixture.debugElement.nativeElement;
    const dialogHost: HTMLElement = ne.querySelector(
      "mdl-dialog-host-component"
    );

    expect(dialogHost.style.width).toBe("350px");
    expect(dialogHost.classList.contains("a")).toBe(
      true,
      "should contian class a"
    );
    expect(dialogHost.classList.contains("b")).toBe(
      true,
      "should contian class b"
    );
  });

  it(
    "should open a dialog if openForm is specified",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const p = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        styles: { width: "350px" },
        classes: "a b",
        openFrom: fixture.componentInstance.button,
      });

      p.subscribe((dialogRef) => {
        dialogRef.hide();
      });
    })
  );

  it(
    "should open a dialog if animation is false",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const p = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        animate: false,
      });

      p.subscribe((dialogRef) => {
        dialogRef.hide();
      });
    })
  );

  it(
    "should open a dialog from a button and close to a mouse event position",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const p = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        styles: { width: "350px" },
        classes: "a b",
        openFrom: fixture.componentInstance.button,
        closeTo: fixture.componentInstance.getFakeMouseEvent(),
      });

      p.subscribe((dialogRef) => {
        dialogRef.hide();
      });
    })
  );

  it(
    "should open a dialog from a OpenCloseRect ",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const p = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        styles: { width: "350px" },
        classes: "a b",
        openFrom: { height: 10, left: 0, top: 0, width: 0 } as IOpenCloseRect,
      });

      p.subscribe((dialogRef) => {
        dialogRef.hide();
      });
    })
  );

  it(
    "should emit an event when the first dialog instance is opened",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const spy = spyOn(mdlDialogService.onDialogsOpenChanged, "emit");

      mdlDialogService.onDialogsOpenChanged.subscribe((dialogsOpen) => {
        expect(dialogsOpen).toBe(true);
      });

      mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        providers: [{ provide: TEST, useValue: "test" }],
      });

      mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        providers: [{ provide: TEST, useValue: "test 2" }],
      });

      expect(spy.calls.count()).toEqual(1);
    })
  );

  it(
    "should emit an event when the last dialog instance is closed",
    waitForAsync(() => {
      const fixture = TestBed.createComponent(MdlTestViewComponent);
      fixture.detectChanges();

      const spy = spyOn(mdlDialogService.onDialogsOpenChanged, "emit");

      const p = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        providers: [{ provide: TEST, useValue: "test 1" }],
      });

      const p2 = mdlDialogService.showCustomDialog({
        component: TestCustomDialogComponent,
        providers: [{ provide: TEST, useValue: "test 2" }],
      });

      mdlDialogService.onDialogsOpenChanged.subscribe((dialogsOpen) => {
        expect(dialogsOpen).toBe(false);
      });

      p.subscribe((dialogRef) => {
        dialogRef.hide();

        p2.subscribe((dialogRef2) => {
          dialogRef2.hide();

          expect(spy.calls.count()).toEqual(2); // 1 open, 1 close.
        });
      });
    })
  );
});
