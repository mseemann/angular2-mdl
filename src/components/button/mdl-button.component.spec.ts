import {
  inject,
  TestComponentBuilder,
  ComponentFixture,
  TestBed,
  async
} from '@angular/core/testing';
import { Component, Optional } from '@angular/core';
import { MdlButtonComponent, MdlButtonModule} from './mdl-button.component';
import { MdlCommonModule} from './../common/mdl-ripple.directive';

describe('Directive: MdlButton', () => {

  var builder: TestComponentBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdlButtonModule, MdlCommonModule],
      declarations: [],
    });

    TestBed.compileComponents();
  }));

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-button to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture: ComponentFixture<MdlTestButtonComponent>) => {

        fixture.detectChanges();

        let btnEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(btnEl.classList.contains('mdl-button')).toBe(true);

        done();
      });
  });

  it('should throw if an unsupported buttontype is provided', ( done ) => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button mdl-button-type="didNotExist"></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture: ComponentFixture<MdlTestButtonComponent>) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

        done();
      });

  });

  it('should throw if an unsupported colored type is provided', ( done) => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button mdl-colored="didNotExist"></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture: ComponentFixture<MdlTestButtonComponent>) => {

        expect( () => fixture.detectChanges() )
          .toThrow();

        done();
      });

  });

  it('should call blur on mouseup and mouseleave', ( done ) => {

    return builder
      .overrideTemplate(MdlTestButtonComponent, `
          <mdl-button></mdl-button>
        `)
      .createAsync(MdlTestButtonComponent).then( (fixture: ComponentFixture<MdlTestButtonComponent>) => {

        fixture.detectChanges();

        var mdlButtonDirective =  fixture.componentInstance.mdlButton;

        spyOn(mdlButtonDirective, 'blurIt').and.callThrough();
        expect(mdlButtonDirective.blurIt).not.toHaveBeenCalled();

        mdlButtonDirective.onMouseUp();
        expect(mdlButtonDirective.blurIt).toHaveBeenCalled();

        mdlButtonDirective.onMouseLeave();
        expect(mdlButtonDirective.blurIt).toHaveBeenCalled();

        done();
      });
  });

  // TODO test exportAs mdlButton
});


@Component({
  selector: 'test-button',
  template: 'replaced by the test',
  providers: [MdlButtonComponent]
})
class MdlTestButtonComponent {
  constructor(@Optional() public mdlButton: MdlButtonComponent) {}
}
