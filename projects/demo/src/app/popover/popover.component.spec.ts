import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopoverComponent} from './popover.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MdlPopoverModule} from '@angular-mdl/popover';
import {MdlModule} from '@angular-mdl/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MdlModule, MdlPopoverModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [PopoverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
