import { LogisticaModule } from './logistica.module';

describe('LogisticaModule', () => {
  let logisticaModule: LogisticaModule;

  beforeEach(() => {
    logisticaModule = new LogisticaModule();
  });

  it('should create an instance', () => {
    expect(logisticaModule).toBeTruthy();
  });
});
