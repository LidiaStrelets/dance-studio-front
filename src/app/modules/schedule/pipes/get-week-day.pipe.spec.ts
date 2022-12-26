import { GetWeekDayPipe } from '@schedulesModule/pipes/get-week-day.pipe';

describe('GetWeekDayPipe', () => {
  it('create an instance', () => {
    const pipe = new GetWeekDayPipe();
    expect(pipe).toBeTruthy();
  });
});
