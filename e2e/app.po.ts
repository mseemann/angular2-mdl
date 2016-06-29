export class Angular2MdlPage {
  navigateTo() {
    return browser.get('/angular2-mdl');
  }

  getHeadlineElement(){
    return element(by.css('.mdl-layout__header-row'));
  }

  getHeadineTextElement(){
    return element(by.css('.docs-layout-title'));
  }
    
  getParagraphText() {
    return this.getHeadineTextElement().getText();
  }
}
