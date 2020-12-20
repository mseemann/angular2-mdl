import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { FabMenuComponent } from "./fab-menu.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MdlFabMenuModule } from "@angular-mdl/fab-menu";
import { MdlModule } from "@angular-mdl/core";

describe("FabMenuComponent", () => {
  let component: FabMenuComponent;
  let fixture: ComponentFixture<FabMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [
          MdlModule,
          MdlFabMenuModule,
          RouterTestingModule,
          NoopAnimationsModule,
        ],
        declarations: [FabMenuComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
