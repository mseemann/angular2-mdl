import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlSpinnerComponent } from './mdl-spinner.component';

describe('Component: MdlProgress', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-spinner to the host element', () => {

    return builder
      .overrideTemplate(MdlTestSpinnerComponent, `
          <mdl-spinner active></mdl-spinner>
        `)
      .createAsync(MdlTestSpinnerComponent).then( (fixture) => {

        fixture.detectChanges();

        let spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(spinnerEl.classList.contains('mdl-spinner')).toBe(true);

      });
  });

  it('should be possible to activate or deactivate the spinner', () => {
    return builder
      .overrideTemplate(MdlTestSpinnerComponent, `
          <mdl-spinner [active]="active"></mdl-spinner>
        `)
      .createAsync(MdlTestSpinnerComponent).then( (fixture) => {

        fixture.detectChanges();

        let spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(spinnerEl.classList.contains('is-active')).toBe(true);

        fixture.componentInstance.active = false;

        fixture.detectChanges();

        expect(spinnerEl.classList.contains('is-active')).toBe(false);
      });
  });

  it('should be possible to colorize or decolorize the spinner', () => {
    return builder
      .overrideTemplate(MdlTestSpinnerComponent, `
          <mdl-spinner [single-color]="colored"></mdl-spinner>
        `)
      .createAsync(MdlTestSpinnerComponent).then( (fixture) => {

        fixture.detectChanges();

        let spinnerEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(spinnerEl.classList.contains('mdl-spinner--single-color')).toBe(true);

        fixture.componentInstance.colored = false;

        fixture.detectChanges();

        expect(spinnerEl.classList.contains('mdl-spinner--single-color')).toBe(false);
      });
  });
});


@Component({
  selector: 'test-progress',
  template: 'replaced by the test',
  directives: [MdlSpinnerComponent]
})
class MdlTestSpinnerComponent {
  protected active = true;
  protected colored = true;
}
