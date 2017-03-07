import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlMenuComponent, MdlMenuModule } from './index';
import { MdlButtonComponent, MdlButtonModule } from '../button/mdl-button.component';
import { MdlMenuRegisty } from './mdl-menu.component';

describe('Component: MdlMenu', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlMenuModule, MdlButtonModule ],
      providers: [ MdlMenuRegisty ],
      declarations: [ MdlTestComponent ],
    });
  });

  it('should add the css class mdl-menu__container to the host element', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-menu>x</mdl-menu>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let menuEl: HTMLElement = fixture.debugElement.query(By.css('.mdl-menu__container')).nativeElement;
    expect(menuEl).toBeDefined();

  });

  it('should export the component instance as mdlMenu', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-menu #menu="mdlMenu">x</mdl-menu>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let references = fixture.debugElement.query(By.directive(MdlMenuComponent)).references;

    expect(references['menu']).toBeDefined();

  });

  it('should throw if toggle is called without a button', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: '<mdl-menu>x</mdl-menu>' }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    expect(() => {
      menu.toggle(null, null);
    }).toThrow();

  });

  it('should show the menu if the the menu button is clicked and hide if clicked again', () => {

    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu"><mdl-menu-item>Action</mdl-menu-item></mdl-menu>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    buttonElement.click();
    expect(menu.isVisible).toBe(true, 'menu should be visible');
    expect(menu.menuElement.classList.contains('is-animating')).toBe(true, 'is-animating');
    expect(menu.container.classList.contains('is-visible')).toBe(true, 'is-visible');

    buttonElement.click();
    expect(menu.isVisible).toBe(false, 'should not be visible');
    expect(menu.menuElement.classList.contains('is-animating')).toBe(true, 'is animation but not visible');
    expect(menu.container.classList.contains('is-visible')).toBe(false, 'is no longer visible');

    expect(menu.container.style.left).not.toBe('');
    expect(menu.container.style.top).not.toBe('');
    expect(menu.container.style.right).toBe('');
    expect(menu.container.style.bottom).toBe('');

  });

  it('should only show one menu at a time', () => {


    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu"><mdl-menu-item>Action</mdl-menu-item></mdl-menu>
          <mdl-button #btn2="mdlButton" (click)="m2.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m2="mdlMenu"><mdl-menu-item>Action</mdl-menu-item></mdl-menu>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let buttonElements = fixture.debugElement.queryAll(By.directive(MdlButtonComponent));
    let menus = fixture.debugElement.queryAll(By.directive(MdlMenuComponent));

    let btn1 = buttonElements[0].nativeElement;
    let menu1 = menus[0].componentInstance;

    let btn2 = buttonElements[1].nativeElement;
    let menu2 = menus[1].componentInstance;

    btn1.click();
    expect(menu1.isVisible).toBe(true, 'menu1 should be visible');


    btn2.click();
    expect(menu2.isVisible).toBe(true, 'menu2 should be visible');
    expect(menu1.isVisible).toBe(false, 'menu1 should not be visible');
  });

  it('should be possible to show a menu bottom-right aligned', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="bottom-right">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    buttonElement.click();
    expect(menu.isVisible).toBe(true);

    expect(menu.container.style.left).toBe('');
    expect(menu.container.style.top).not.toBe('');
    expect(menu.container.style.right).not.toBe('');
    expect(menu.container.style.bottom).toBe('');

  });

  it('should be possible to show a menu top-left aligned', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="top-left">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    buttonElement.click();
    expect(menu.isVisible).toBe(true);

    expect(menu.container.style.left).not.toBe('');
    expect(menu.container.style.top).toBe('');
    expect(menu.container.style.right).toBe('');
    expect(menu.container.style.bottom).not.toBe('');

  });

  it('should be possible to show a menu top-right aligned', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="top-right">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    buttonElement.click();
    expect(menu.isVisible).toBe(true);

    expect(menu.container.style.left).toBe('');
    expect(menu.container.style.top).toBe('');
    expect(menu.container.style.right).not.toBe('');
    expect(menu.container.style.bottom).not.toBe('');

  });

  it('should be possible to show a menu unaligned', () => {
    TestBed.overrideComponent(MdlTestComponent, { set: {
      template: `
          <mdl-button #btn="mdlButton" (click)="m1.toggle($event, btn)">button</mdl-button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="unaligned">
            <mdl-menu-item>Action</mdl-menu-item>
          </mdl-menu>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestComponent);
    fixture.detectChanges();

    let buttonElement = fixture.debugElement.query(By.directive(MdlButtonComponent)).nativeElement;
    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    buttonElement.click();
    expect(menu.isVisible).toBe(true);

    expect(menu.container.style.left).toBe('');
    expect(menu.container.style.top).toBe('');
    expect(menu.container.style.right).toBe('');

  });


});


@Component({
  selector: 'test-menu',
  template: 'replaced by the test'
})
class MdlTestComponent {}
