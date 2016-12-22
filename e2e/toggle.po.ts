import {browser, element, by} from 'protractor';

export class TogglePage {

  public navigateTo() {
    return browser.get('/angular2-mdl');
  }

  public getFirstCheckboxElement() {
    return element(by.css('.mdl-checkbox__tick-outline'));
  }

}
