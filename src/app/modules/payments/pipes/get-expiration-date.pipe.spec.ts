import { GetExpirationDatePipe } from '@paymentsModule/pipes/get-expiration-date.pipe';

describe('GetExpirationDatePipe', () => {
  it('create an instance', () => {
    const pipe = new GetExpirationDatePipe();
    expect(pipe).toBeTruthy();
  });
});
