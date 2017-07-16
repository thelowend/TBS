import { TBSPage } from './app.po';

describe('tbs App', function() {
  let page: TBSPage;

  beforeEach(() => {
    page = new TBSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
