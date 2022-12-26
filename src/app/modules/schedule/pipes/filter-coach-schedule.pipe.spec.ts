import { FilterCoachSchedulePipe } from '@schedulesModule/pipes/filter-coach-schedule.pipe';

fdescribe('FilterCoachSchedulePipe', () => {
  const dateServiceSpy = jasmine.createSpyObj(['getWeekDay']);

  it('create an instance', () => {
    const pipe = new FilterCoachSchedulePipe(dateServiceSpy);
    expect(pipe).toBeTruthy();
  });
});
