import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component} from '@angular/core';
import {MdlMenuModule} from './mdl-menu.module';
import {MdlButtonComponent} from '../button/mdl-button.component';
import {MdlMenuComponent, MdlMenuRegisty} from './mdl-menu.component';
import {MdlButtonModule} from '../button/mdl-button.module';


@Component({
  // tslint:disable-next-line
  selector: 'test-menu',
  template: `
    <button mdl-button [mdl-toggle-menu]="m"></button>
    <mdl-menu #m="mdlMenu">
      <mdl-menu-item>x</mdl-menu-item>
    </mdl-menu>
  `
})
class MdlTestMenuItemComponent {
}

describe('Component: MdlToggleMenu-Directive', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlMenuModule, MdlButtonModule],
      providers: [MdlMenuRegisty],
      declarations: [MdlTestMenuItemComponent],
    });
  });

  it('should show the menu if the button is clicked', () => {

    const fixture = TestBed.createComponent(MdlTestMenuItemComponent);
    fixture.detectChanges();

    const item: HTMLElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;

    const menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;
    spyOn(menu, 'show').and.callThrough();
    spyOn(menu, 'hide');

    // show
    item.click();
    fixture.detectChanges();

    // hide
    item.click();
    fixture.detectChanges();

    expect(menu.show).toHaveBeenCalled();
    expect(menu.hide).toHaveBeenCalled();

  });


});
