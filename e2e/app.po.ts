export class Angular2MdlPage {
  navigateTo() {
    return browser.get('/angular2-mdl');
  }

  getParagraphText() {
    return element(by.css('angular2-mdl-app h1')).getText();
  }
}
