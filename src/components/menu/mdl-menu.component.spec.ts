import {
  inject,
  TestComponentBuilder
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlMenuComponent } from './mdl-menu.component';
import { MdlMenuItemComponent } from './mdl-menu-item.component';
import { MdlButtonComponent } from './../button/mdl-button.component';

describe('Component: MdlMenu', () => {

  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should add the css class mdl-menu__container to the host element', ( done ) => {

    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-menu>x</mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let menuEl: HTMLElement = fixture.debugElement.query(By.css('.mdl-menu__container')).nativeElement;
        expect(menuEl).toBeDefined();

        done();
      });
  });

  it('should export the component instance as mdlMenu', ( done ) => {

    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-menu #menu="mdlMenu">x</mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let references = fixture.debugElement.query(By.directive(MdlMenuComponent)).references;

        expect(references['menu']).toBeDefined();

        done();
      });
  });

  it('should throw if toggle is called without a button', ( done ) => {

    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-menu>x</mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        expect(() => {
          menu.toggle(null, null);
        }).toThrow();

        done();
      });
  });

  it('should show the menu if the the menu button is clicked and hide if clicked again', ( done ) => {
    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu"><mdl-menu-item>Action</mdl-menu-item></mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        buttonElement.click();
        expect(menu.isVisible).toBe(true);
        expect(menu.menuElement.classList.contains('is-animating')).toBe(true);
        expect(menu.container.classList.contains('is-visible')).toBe(true);

        buttonElement.click();
        expect(menu.isVisible).toBe(false);
        expect(menu.menuElement.classList.contains('is-animating')).toBe(true);
        expect(menu.container.classList.contains('is-visible')).toBe(false);

        expect(menu.container.style.left).not.toBe('');
        expect(menu.container.style.top).not.toBe('');
        expect(menu.container.style.right).toBe('');
        expect(menu.container.style.bottom).toBe('');

        done();

      });
  });

  it('should be possible to show a menu bottom-right aligned', ( done ) => {
    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="bottom-right">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        buttonElement.click();
        expect(menu.isVisible).toBe(true);

        expect(menu.container.style.left).toBe('');
        expect(menu.container.style.top).not.toBe('');
        expect(menu.container.style.right).not.toBe('');
        expect(menu.container.style.bottom).toBe('');

        done();

      });
  });

  it('should be possible to show a menu top-left aligned', ( done ) => {
    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="top-left">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        buttonElement.click();
        expect(menu.isVisible).toBe(true);

        expect(menu.container.style.left).not.toBe('');
        expect(menu.container.style.top).toBe('');
        expect(menu.container.style.right).toBe('');
        expect(menu.container.style.bottom).not.toBe('');
        done();

      });
  });

  it('should be possible to show a menu top-right aligned', ( done ) => {
    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="top-right">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        buttonElement.click();
        expect(menu.isVisible).toBe(true);

        expect(menu.container.style.left).toBe('');
        expect(menu.container.style.top).toBe('');
        expect(menu.container.style.right).not.toBe('');
        expect(menu.container.style.bottom).not.toBe('');

        done();

      });
  });

  it('should be possible to show a menu unaligned', ( done ) => {
    return builder
      .overrideTemplate(MdlTestIconComponent, `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="unaligned">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        `)
      .createAsync(MdlTestIconComponent).then( (fixture) => {

        fixture.detectChanges();

        let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
        let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

        buttonElement.click();
        expect(menu.isVisible).toBe(true);

        expect(menu.container.style.left).toBe('');
        expect(menu.container.style.top).toBe('');
        expect(menu.container.style.right).toBe('');
        done();

      });
  });


});


@Component({
  selector: 'test-menu',
  template: 'replaced by the test',
  directives: [MdlMenuComponent, MdlButtonComponent, MdlMenuItemComponent]
})
class MdlTestIconComponent {}
