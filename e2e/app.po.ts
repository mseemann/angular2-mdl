import { browser, element, by } from 'protractor';

export class Angular2MdlPage {
  public navigateTo() {
    return browser.get('/angular2-mdl');
  }

  public getHeadlineElement() {
    return element(by.css('.mdl-layout__header-row'));
  }

  public getHeadineTextElement() {
    return element(by.css('.docs-layout-title'));
  }

  public getParagraphText() {
    return this.getHeadineTextElement().getText();
  }
}
