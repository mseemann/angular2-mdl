import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabMenuComponent } from './fab-menu.component';

describe('FabMenuComponent', () => {
  let component: FabMenuComponent;
  let fixture: ComponentFixture<FabMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
