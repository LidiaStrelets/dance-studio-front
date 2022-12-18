import { FilterExpiredPipe } from './filter-expired.pipe';

describe('FilterExpiredPipe', () => {
  it('create an instance', () => {
    const getExpirationDateSpy = jasmine.createSpyObj(['']);
    const pipe = new FilterExpiredPipe(getExpirationDateSpy);
    expect(pipe).toBeTruthy();
  });
});
