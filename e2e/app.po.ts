import { browser, by, element } from 'protractor';

export class SxRxPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sx-root h1')).getText();
  }
}
