import { Angular2MdlPage } from './app.po';

describe('angular2-mdl App', function() {
  let page: Angular2MdlPage;

  beforeEach(() => {
    page = new Angular2MdlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Angular 2 - Material Design Lite');
  });

});
