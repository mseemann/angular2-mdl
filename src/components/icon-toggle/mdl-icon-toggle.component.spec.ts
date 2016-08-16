import { TestBed, inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlIconToggleModule } from './mdl-icon-toggle.component';
import { FormsModule} from '@angular/forms';


describe('Component: MdlIconToggle', () => {

  var doc: HTMLDocument;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdlIconToggleModule],
      declarations: [ MdlTestIconToggleComponent ],
    });

  });

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


});


@Component({
  selector: 'test-icon',
  template: '<mdl-icon-toggle [(ngModel)]="checkboxValue1" mdl-ripple>format_bold</mdl-icon-toggle>'
})
class MdlTestIconToggleComponent {
}
