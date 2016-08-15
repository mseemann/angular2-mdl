import {
  inject,
  TestComponentBuilder,
  TestBed,
  async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlProgressComponent, MdlProgressModule } from './mdl-progress.component';

describe('Component: MdlProgress', () => {

  var builder: TestComponentBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdlProgressModule],
      declarations: [],
    });

    TestBed.compileComponents();
  }));


  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-progress to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestProgressComponent, `
          <mdl-progress progress="44"></mdl-progress>
        `)
      .createAsync(MdlTestProgressComponent).then( (fixture) => {

        fixture.detectChanges();

        let progressEl: HTMLElement = fixture.nativeElement.children.item(0);
        expect(progressEl.classList.contains('mdl-progress')).toBe(true);

        done();
      });
  });

  it('should call setBuffer - if the buffer changes', ( done ) => {
    return builder
      .overrideTemplate(MdlTestProgressComponent, `
          <mdl-progress progress="44" [buffer]="buffer"></mdl-progress>
        `)
      .createAsync(MdlTestProgressComponent).then( (fixture) => {

        fixture.detectChanges();

        let component = fixture.componentInstance;

        let progressComponent = fixture.debugElement.query(By.directive(MdlProgressComponent)).componentInstance;

        spyOn(progressComponent, 'setBuffer');

        component.buffer = 23;
        fixture.detectChanges();
        expect(progressComponent.setBuffer).toHaveBeenCalled();

        done();
      });
  });

});


@Component({
  selector: 'test-progress',
  template: 'replaced by the test'
})
class MdlTestProgressComponent {
  public buffer = 20;
}
