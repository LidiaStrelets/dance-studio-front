import { ToExpirationDatePipe } from './to-expiration-date.pipe';

describe('ToExpirationDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ToExpirationDatePipe();
    expect(pipe).toBeTruthy();
  });
});
