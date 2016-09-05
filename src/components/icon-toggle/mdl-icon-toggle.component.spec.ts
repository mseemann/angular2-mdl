import { TestBed, inject, async } from '@angular/core/testing';
import { DOCUMENT, By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlIconToggleModule, MdlIconToggleComponent } from './mdl-icon-toggle.component';
import { FormsModule} from '@angular/forms';


describe('Component: MdlIconToggle', () => {

  var doc: HTMLDocument;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdlIconToggleModule],
      declarations: [ MdlTestIconToggleComponent ],
    });

  }));

  beforeEach(inject([DOCUMENT], function (document) {
    doc = document;
  }));

  it('should add the css class mdl-icon-toggle to the host element', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestIconToggleComponent);
    fixture.detectChanges();

    let checkboxEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(checkboxEl.classList.contains('mdl-icon-toggle')).toBe(true);

    done();

  });

  it('should fire a change event if the state changed', async(() => {
    let fixture = TestBed.createComponent(MdlTestIconToggleComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;

    spyOn(instance, 'onChange');

    fixture.debugElement.query(By.directive(MdlIconToggleComponent)).nativeElement.click();

    expect(instance.onChange).toHaveBeenCalledWith(true);
  }));

});


@Component({
  selector: 'test-icon',
  template: '<mdl-icon-toggle [(ngModel)]="checkboxValue1" mdl-ripple (change)="onChange($event)">format_bold</mdl-icon-toggle>'
})
class MdlTestIconToggleComponent {

  public onChange(v: boolean) {}
}
