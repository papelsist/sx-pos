import { SxRxPage } from './app.po';

describe('sx-rx App', () => {
  let page: SxRxPage;

  beforeEach(() => {
    page = new SxRxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to sx!!');
  });
});
