import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ExpansionPanelComponent} from './expansion-panel.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdlModule} from '@angular-mdl/core';
import {MdlExpansionPanelModule} from '@angular-mdl/expansion-panel';

describe('ExpansionPanelComponent', () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MdlModule, MdlExpansionPanelModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [ExpansionPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
