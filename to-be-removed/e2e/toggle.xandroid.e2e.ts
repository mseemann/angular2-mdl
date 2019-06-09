import { TogglePage } from './toggle.po';

describe('angular2-mdl toggle', function() {
  let page: TogglePage;

  beforeEach(() => {
    page = new TogglePage();
  });

  it('should display the checkmark for checkboxes', () => {
    page.navigateTo();
    // if i did a mistake and the scss files are not mofdified - this will be an *.svg image
    expect(page.getFirstCheckboxElement().getCssValue('background-image')).toContain('data:image/svg+xml;base64,');
  });

});
