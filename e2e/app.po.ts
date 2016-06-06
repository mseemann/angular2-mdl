export class Angular2MdlPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-mdl-app h1')).getText();
  }
}
