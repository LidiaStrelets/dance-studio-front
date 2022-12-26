import { ZoneTimePipe } from '@pipes/zone-time.pipe';

describe('ZoneTimePipe', () => {
  it('create an instance', () => {
    const languageServiceSpy = jasmine.createSpyObj(['isUk']);

    const pipe = new ZoneTimePipe(languageServiceSpy);
    expect(pipe).toBeTruthy();
  });
});
