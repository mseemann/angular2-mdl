import { Angular2MdlPage } from './app.po';

describe('angular2-mdl App', function() {
  let page: Angular2MdlPage;

  beforeEach(() => {
    page = new Angular2MdlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angular2-mdl works!');
  });

  it('should have theme accent colors', () => {
    page.navigateTo();
    expect(page.getHeadlineElement().getCssValue('color')).toEqual('rgba(255, 215, 64, 1)');
  });

  it('should have primary dark background color', () => {
    page.navigateTo();
    expect(page.getHeadlineElement().getCssValue('background-color')).toEqual('rgba(25, 118, 210, 1)');
  })


});
