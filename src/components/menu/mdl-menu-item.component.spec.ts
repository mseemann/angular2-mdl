import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlMenuComponent } from './mdl-menu.component';
import { MdlMenuItemComponent } from './mdl-menu-item.component';

describe('Component: MdlMenuItem', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-menu__item to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestMenuItemComponent, `
          <mdl-menu><mdl-menu-item>x</mdl-menu-item></mdl-menu>
        `)
      .createAsync(MdlTestMenuItemComponent).then( (fixture) => {

        fixture.detectChanges();

        let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;
        expect(menuItemEl.classList.contains('mdl-menu__item')).toBe(true);

        done();
      });
  });

  it('should call hideOnItemClicked on menu if the item is clicked', ( done ) => {
    return builder
      .overrideTemplate(MdlTestMenuItemComponent, `
          <mdl-menu><mdl-menu-item>x</mdl-menu-item></mdl-menu>
        `)
      .createAsync(MdlTestMenuItemComponent).then( (fixture) => {

        fixture.detectChanges();

        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;

        spyOn(menu, 'hideOnItemClicked').and.callThrough();
        expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

        menuItemEl.click();

        expect(menu.hideOnItemClicked).toHaveBeenCalled();

        done();
      });
  });

  it('should call hideOnItemClicked on menu if the item is touched', ( done ) => {
    return builder
      .overrideTemplate(MdlTestMenuItemComponent, `
          <mdl-menu><mdl-menu-item>x</mdl-menu-item></mdl-menu>
        `)
      .createAsync(MdlTestMenuItemComponent).then( (fixture) => {

        fixture.detectChanges();

        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;

        spyOn(menu, 'hideOnItemClicked').and.callThrough();
        expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

        let event = new Event('touchstart', {});
        menuItemEl.dispatchEvent(event);

        expect(menu.hideOnItemClicked).toHaveBeenCalled();

        done();
      });
  });

  it('should not call hideOnItemClicked on menu if the item is disbaled', ( done ) => {
    return builder
      .overrideTemplate(MdlTestMenuItemComponent, `
          <mdl-menu><mdl-menu-item disabled>x</mdl-menu-item></mdl-menu>
        `)
      .createAsync(MdlTestMenuItemComponent).then( (fixture) => {

        fixture.detectChanges();

        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;

        spyOn(menu, 'hideOnItemClicked').and.callThrough();
        expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

        menuItemEl.click();

        expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

        done();
      });
  });

});


@Component({
  selector: 'test-menu',
  template: 'replaced by the test',
  directives: [MdlMenuComponent, MdlMenuItemComponent]
})
class MdlTestMenuItemComponent {}
