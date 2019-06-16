import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectComponent} from './select.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdlModule} from '@angular-mdl/core';
import {MdlPopoverModule} from '@angular-mdl/popover';
import {MdlSelectModule} from '@angular-mdl/select';
import {MatchSorterPipe} from './matchSorter.pipe';


describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MdlModule, MdlPopoverModule, MdlSelectModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [SelectComponent, MatchSorterPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
