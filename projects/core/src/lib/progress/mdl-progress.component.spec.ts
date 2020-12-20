import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {MdlProgressComponent} from './mdl-progress.component';
import {MdlProgressModule} from './mdl-progress.module';


@Component({
  // eslint-disable-next-line
  selector: 'test-progress',
  template: 'replaced by the test'
})
class MdlTestProgressComponent {
  public buffer = 20;
}

describe('Component: MdlProgress', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlProgressModule.forRoot()],
      declarations: [MdlTestProgressComponent],
    });
  });

  it('should add the css class mdl-progress to the host element', () => {

    TestBed.overrideComponent(MdlTestProgressComponent, {
      set: {
        template: '<mdl-progress progress="44"></mdl-progress>'
      }
    });
    const fixture = TestBed.createComponent(MdlTestProgressComponent);
    fixture.detectChanges();

    const progressEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(progressEl.classList.contains('mdl-progress')).toBe(true);

  });

  it('should call setBuffer - if the buffer changes', () => {

    TestBed.overrideComponent(MdlTestProgressComponent, {
      set: {
        template: '<mdl-progress progress="44" [buffer]="buffer"></mdl-progress>'
      }
    });
    const fixture = TestBed.createComponent(MdlTestProgressComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    const progressComponent = fixture.debugElement.query(By.directive(MdlProgressComponent)).componentInstance;

    spyOn(progressComponent, 'setBuffer');

    component.buffer = 23;
    fixture.detectChanges();
    expect(progressComponent.setBuffer).toHaveBeenCalled();

  });


  it('should be possible to set the indeterminate state', () => {

    TestBed.overrideComponent(MdlTestProgressComponent, {
      set: {
        template: '<mdl-progress [indeterminate]="true"></mdl-progress>'
      }
    });
    const fixture = TestBed.createComponent(MdlTestProgressComponent);
    fixture.detectChanges();

    const progressEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(progressEl.classList.contains('mdl-progress__indeterminate')).toBe(true);

  });

});
