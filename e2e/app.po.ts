export class Angular2MdlPage {
  navigateTo() {
    return browser.get('/angular2-mdl');
  }

  getHeadlineElement(){
    return element(by.css('angular2-mdl-app h1'));
  }

  getParagraphText() {
    return this.getHeadlineElement().getText();
  }
}
