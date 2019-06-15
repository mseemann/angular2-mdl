import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdlPopoverModule} from './popover.module';
import {MdlPopoverComponent} from './popover.component';

@Component({
  // tslint:disable-next-line
  selector: 'test-component',
  template: `
    <button id="mainButton" (click)="popover.toggle($event)">button</button>
    <mdl-popover id="mainPopover" #popover>popover content</mdl-popover>

    <button (click)="anotherPopover.toggle($event)" id="anotherButton">button</button>
    <mdl-popover id="anotherPopover" #anotherPopover>fubar</mdl-popover>

    <button id="positionPopoverButton" #positionPopoverButton
            (click)="positionPopover.toggle($event, positionPopoverButton)">button
    </button>
    <mdl-popover id="positionPopover" #positionPopover mdl-popover-position="bottom-left">popover with position set
    </mdl-popover>
  `
})
class TestComponent {
}


describe('MdlPopover', () => {

  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdlPopoverModule.forRoot()],
      declarations: [TestComponent],
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    });
  }));


  it('should create the component and add the mdl-popover css class', async(() => {

    const popoverComponent = fixture.debugElement.query(By.directive(MdlPopoverComponent));

    const popoverNativeElement = popoverComponent.nativeElement;

    expect(popoverNativeElement.classList.contains('mdl-popover'))
      .toBe(true, 'did not has css class mdl-popover');

  }));

  it('should hide on click outside of popover', async(() => {

    const popoverComponent = fixture.debugElement.query(By.directive(MdlPopoverComponent));

    const popoverComponentInstance = popoverComponent.componentInstance;

    popoverComponentInstance.isVisible = true;

    spyOn(popoverComponentInstance, 'hide').and.callThrough();

    spyOn(popoverComponentInstance.onHide, 'emit').and.callThrough();

    fixture.debugElement.nativeElement.click();

    expect(popoverComponentInstance.hide).toHaveBeenCalled();

    expect(popoverComponentInstance.onHide.emit).toHaveBeenCalled();
  }));

  it('should toggle popover on button click', async(() => {

    const popoverComponent = fixture.debugElement.query(By.directive(MdlPopoverComponent));

    const popoverNativeElement = popoverComponent.nativeElement;

    const buttonNativeElement = fixture.debugElement.query(By.css('button')).nativeElement;

    const popoverComponentInstance = popoverComponent.componentInstance;

    expect(popoverComponentInstance.isVisible)
      .toEqual(false, 'isVisible is not false');

    expect(popoverNativeElement.classList.contains('is-visible'))
      .toBe(false, 'did has css class is-visible');

    spyOn(popoverComponentInstance, 'toggle').and.callThrough();

    spyOn(popoverComponentInstance, 'show').and.callThrough();

    spyOn(popoverComponentInstance.onShow, 'emit').and.callThrough();

    spyOn(popoverComponentInstance, 'hideAllPopovers').and.callThrough();

    spyOn(popoverComponentInstance, 'updateDirection').and.callThrough();

    buttonNativeElement.click();

    expect(popoverComponentInstance.toggle).toHaveBeenCalled();

    expect(popoverComponentInstance.show).toHaveBeenCalled();

    expect(popoverComponentInstance.onShow.emit).toHaveBeenCalled();

    expect(popoverComponentInstance.hideAllPopovers).toHaveBeenCalled();

    expect(popoverComponentInstance.updateDirection).toHaveBeenCalled();

    expect(popoverComponentInstance.isVisible)
      .toEqual(true, 'toggle did not update isVisible to true');

    fixture.detectChanges();
    fixture.whenStable().then(() => {

      expect(popoverNativeElement.classList.contains('is-visible'))
        .toBe(true, 'did not has css class is-visible');
    });
  }));

  it('should toggle popover on another popover opening', async(() => {

    const popoverComponent = fixture.debugElement.query(By.directive(MdlPopoverComponent));
    const popoverNativeElement = popoverComponent.nativeElement;
    const buttonNativeElement = fixture.debugElement.query(By.css('button')).nativeElement;
    const popoverComponentInstance = popoverComponent.componentInstance;
    const anotherButtonNativeElement = fixture.debugElement.query(By.css('#anotherButton')).nativeElement;
    const anotherPopoverComponentInstance = fixture.debugElement.query(By.css('#anotherPopover')).componentInstance;

    expect(popoverComponentInstance.isVisible)
      .toEqual(false, 'isVisible is not false');

    expect(popoverNativeElement.classList.contains('is-visible'))
      .toBe(false, 'did has css class is-visible');

    spyOn(popoverComponentInstance, 'toggle').and.callThrough();

    spyOn(popoverComponentInstance, 'hideAllPopovers').and.callThrough();

    spyOn(popoverComponentInstance, 'updateDirection').and.callThrough();

    buttonNativeElement.click();

    expect(popoverComponentInstance.toggle).toHaveBeenCalled();

    expect(popoverComponentInstance.hideAllPopovers).toHaveBeenCalled();

    expect(popoverComponentInstance.updateDirection).toHaveBeenCalled();

    expect(popoverComponentInstance.isVisible)
      .toEqual(true, 'toggle did not update isVisible to true');

    fixture.detectChanges();
    fixture.whenStable().then(() => {

      expect(popoverNativeElement.classList.contains('is-visible'))
        .toBe(true, 'did not has css class is-visible');
    });

    const hideAllPopoversSpy = spyOn(anotherPopoverComponentInstance, 'hideAllPopovers').and.callThrough();

    anotherButtonNativeElement.click();

    fixture.whenStable().then(() => {
      expect(hideAllPopoversSpy).toHaveBeenCalled();
      expect(anotherPopoverComponentInstance.isVisible).toBe(true, 'second popover did not show');
      expect(popoverComponentInstance.isVisible).toBe(false, 'main popover did not hide');
    });
  }));

  it('should use user specified popover position', async(async () => {
    const popoverComponent = fixture.debugElement.query(By.css('#positionPopover'));
    const popoverNativeElement = popoverComponent.nativeElement;
    const popoverComponentInstance = popoverComponent.componentInstance;

    const buttonNativeElement = fixture.debugElement.query(By.css('#positionPopoverButton')).nativeElement;

    expect(popoverComponentInstance.isVisible)
      .toEqual(false, 'isVisible is not false');

    expect(popoverNativeElement.classList.contains('is-visible'))
      .toBe(false, 'has not css class is-visible');

    spyOn(popoverComponentInstance, 'toggle').and.callThrough();

    spyOn(popoverComponentInstance, 'hideAllPopovers').and.callThrough();

    spyOn(popoverComponentInstance, 'updateDirection').and.callThrough();

    buttonNativeElement.click();

    expect(popoverComponentInstance.toggle).toHaveBeenCalled();

    expect(popoverComponentInstance.hideAllPopovers).toHaveBeenCalled();

    expect(popoverComponentInstance.updateDirection).toHaveBeenCalled();

    expect(popoverComponentInstance.isVisible)
      .toEqual(true, 'toggle did not update isVisible to true');

    fixture.detectChanges();
    await fixture.whenStable();
    expect(popoverNativeElement.classList.contains('is-visible'))
      .toBe(true, 'did not has css class is-visible');

    spyOn(popoverComponentInstance, 'hide').and.callThrough();
    popoverComponentInstance.hide();

    fixture.detectChanges();
    await fixture.whenStable();
    expect(popoverNativeElement.classList.contains('is-visible'))
      .toBe(false, 'has not css class is-visible');

    const allOtherPositions = ['bottom-right', 'top-left', 'top-right', 'non-existent-one!'];
    for (const position of allOtherPositions) {
      popoverComponentInstance.position = position;
      buttonNativeElement.click();

      fixture.detectChanges();
      await fixture.whenStable();
      expect(popoverNativeElement.classList.contains('is-visible'))
        .toBe(true, 'did not has css class is-visible');

      popoverComponentInstance.hide();

      fixture.detectChanges();
      await fixture.whenStable();
      expect(popoverNativeElement.classList.contains('is-visible'))
        .toBe(false, 'has not css class is-visible');
    }
  }));
});
