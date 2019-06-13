import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatePickerComponent} from './date-picker.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MdlDatePickerModule} from '@angular-mdl/datepicker';
import {MdlModule} from '@angular-mdl/core';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MdlModule, MdlDatePickerModule],
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
