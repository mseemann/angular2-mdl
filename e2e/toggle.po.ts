export class TogglePage {

  public navigateTo() {
    return browser.get('/toggle');
  }

  public getFirstCheckboxElement() {
    return element(by.css('.mdl-checkbox__tick-outline'));
  }

}
