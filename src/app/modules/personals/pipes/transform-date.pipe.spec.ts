import { TransformDatePipe } from '@personalsModule/pipes/transform-date.pipe';

describe('TransformDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TransformDatePipe();
    expect(pipe).toBeTruthy();
  });
});
