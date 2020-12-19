import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DatePickerComponent} from './date-picker.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MdlDatePickerModule} from '@angular-mdl/datepicker';
import {MdlModule} from '@angular-mdl/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MdlModule, MdlDatePickerModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [DatePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
