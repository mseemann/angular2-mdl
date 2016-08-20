export class TogglePage {

  public navigateTo() {
    return browser.get('/angular2-mdl/toggle');
  }

  public getFirstCheckboxElement() {
    return element(by.css('.mdl-checkbox__tick-outline'));
  }

}
