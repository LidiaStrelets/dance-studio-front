import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  it('create an instance', () => {
    const zoneSpy = jasmine.createSpyObj(['']);
    const pipe = new FormatDatePipe(zoneSpy);
    expect(pipe).toBeTruthy();
  });
});
