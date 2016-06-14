export class Angular2MdlPage {
  navigateTo() {
    return browser.get('/angular2-mdl');
  }

  getHeadlineElement(){
    return element(by.css('h1.mdl-color-text--accent'));
  }

  getParagraphText() {
    return this.getHeadlineElement().getText();
  }
}
