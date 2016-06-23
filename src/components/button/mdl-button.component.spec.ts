import {
  describe,
  expect,
  it,
  inject,
  tick,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Optional } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { MdlButtonComponent} from './mdl-button.component';
import { MDL_COMMON_DIRECTIVES } from './../common/mdl-ripple.directive';

describe('Directive: MdlButton', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-button to the host element', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        fixture.detectChanges();

        let btnEl:HTMLElement = fixture.nativeElement.children.item(0);
        expect(btnEl.classList.contains('mdl-button')).toBe(true);

      })
  });

  it('should throw if an unsupported buttontype is provided', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button mdl-button-type="didNotExist"></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      })

  });

  it('should throw if an unsupported colored type is provided', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button mdl-colored="didNotExist"></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

      })

  });

  it('should call blur on mouseup and mouseleave', () => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture:ComponentFixture<MdlTestButtonComponent>) => {

        fixture.detectChanges();

        var mdlButtonDirective =  fixture.componentInstance.mdlButton;

        spyOn(mdlButtonDirective, 'blurIt').and.callThrough();
        expect(mdlButtonDirective.blurIt).not.toHaveBeenCalled();

        mdlButtonDirective.onMouseUp();
        expect(mdlButtonDirective.blurIt).toHaveBeenCalled();

        mdlButtonDirective.onMouseLeave();
        expect(mdlButtonDirective.blurIt).toHaveBeenCalled();

      })
  });
});


@Component({
  selector: 'test-button',
  template: "replaced by the test",
  directives: [MDL_COMMON_DIRECTIVES, MdlButtonComponent],
  providers: [MdlButtonComponent]
})
class MdlTestButtonComponent {
  constructor(@Optional() public mdlButton:MdlButtonComponent){}
}
